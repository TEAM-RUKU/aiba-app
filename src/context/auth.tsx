import type { CustomErrorType } from "@app/api/mutator/customAxios";
import type { UserAtom } from "@app/utils/types";
import type { AxiosResponse } from "axios";

import React from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import AwaitLock from "await-lock";
import axios, { AxiosError } from "axios";
import jwt_decode from "jwt-decode";
import moment from "moment";
import { useSetRecoilState } from "recoil";

import { axiosInstance } from "@app/api/mutator/customAxios";
import getEnvVars from "@app/environment";
import { userAtom } from "@app/utils/atoms";
import { log } from "@app/utils/logging";

const { apiUrl } = getEnvVars();
const lock = new AwaitLock();

const AuthContext = React.createContext<{
  accessToken: string;
  refreshToken: string;
  getAccessToken: () => Promise<string>;
  getRefreshToken: () => Promise<string>;
  setTokens: (accessToken: string, refreshToken: string) => Promise<void>;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
}>(null);
const { Provider } = AuthContext;

interface AuthProviderProps {
  children: React.ReactNode;
}
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = React.useState<string>(null);
  const [refreshToken, setRefreshToken] = React.useState<string>(null);
  const [loaded, setLoaded] = React.useState<boolean>(false);

  React.useEffect(() => {
    const loadTokens = async () => {
      try {
        const savedAccessToken = await AsyncStorage.getItem("accessToken");
        const savedRefreshToken = await AsyncStorage.getItem("refreshToken");

        if (savedAccessToken && savedRefreshToken) {
          setAccessToken(savedAccessToken);
          setRefreshToken(savedRefreshToken);
        }
      } catch (error) {
        console.error("토큰 불러오기 오류:", error);
      } finally {
        setLoaded(true);
      }
    };

    loadTokens();
  }, []);

  const getAccessToken = async () => {
    try {
      const savedAccessToken = await AsyncStorage.getItem("accessToken");
      return savedAccessToken;
    } catch (error) {
      console.error("토큰 불러오기 오류:", error);
    }
  };

  const getRefreshToken = async () => {
    try {
      const savedRefreshToken = await AsyncStorage.getItem("refreshToken");
      return savedRefreshToken;
    } catch (error) {
      console.error("토큰 불러오기 오류:", error);
    }
  };

  const setTokens = async (AccessToken: string, RefreshToken: string) => {
    try {
      await AsyncStorage.setItem("accessToken", AccessToken);
      await AsyncStorage.setItem("refreshToken", RefreshToken);
      setAccessToken(AccessToken);
      setRefreshToken(RefreshToken);
    } catch (error) {
      console.error("토큰 저장 오류:", error);
    }
  };

  const resetTokens = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
      setAccessToken(null);
      setRefreshToken(null);
    } catch (error) {
      console.error("토큰 삭제 오류:", error);
    }
  };

  React.useEffect(() => {
    const requestHandler = async (config) => {
      log(
        "AXIO",
        `Interceptor --> [${config.method.toUpperCase()}] ${config.url}`,
      );

      if (!accessToken) {
        return config;
      }

      await lock.acquireAsync();

      const now = moment().unix();
      const expired = jwt_decode<{
        exp: number;
      }>(accessToken).exp;

      if (now + 10 > expired) {
        await refresh();
      }

      lock.release();

      if (!(await getAccessToken())) {
        return Promise.reject("인증되지 않았습니다.");
      }

      return {
        ...config,
        headers: {
          Authorization: `Bearer ${await getAccessToken()}`,
          ...config?.headers,
        },
      };
    };

    const requestErrorHandler = async (err: CustomErrorType) => {
      log(
        "EROR",
        `Interceptor --> [${err.config.method.toUpperCase()}] ${
          err.config.url
        } ${err.code}`,
      );

      return Promise.reject(err);
    };

    const requestInterceptor = axiosInstance.interceptors.request.use(
      (response) => requestHandler(response),
      (err) => requestErrorHandler(err),
    );

    const responseHandler = (response: AxiosResponse) => {
      log(
        "AXIO",
        `Interceptor <-- [${response.config.method.toUpperCase()}] ${
          response.config.url
        } ${response.status}`,
      );

      return response;
    };

    const responseErrorHandler = async (err: CustomErrorType) => {
      if (!err.response?.status) {
        log(
          "EROR",
          `Interceptor <-- [${err.config.method.toUpperCase()}] ${
            err.config.url
          } ${err.code}`,
        );
      } else {
        log(
          "EROR",
          `Interceptor <-- [${err.config.method.toUpperCase()}] ${
            err.config.url
          } ${err.response.status} ${JSON.stringify(
            err.response.data,
            null,
            2,
          )}`,
        );
      }

      if (err.code === "ERR_CANCELED") {
        return Promise.reject(err);
      }

      if (err.response.status === 401) {
        return Promise.reject(err);
      }

      // TODO: error message

      return Promise.reject(err);
    };

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => responseHandler(response),
      (err) => responseErrorHandler(err),
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, refreshToken]);

  const setUser = useSetRecoilState(userAtom);
  React.useEffect(() => {
    log("AUTH", "Token Updated");
    if (accessToken) {
      const user = jwt_decode(accessToken);
      log("AUTH", `User Info Updated: ${JSON.stringify(user, null, 2)}`);
      setUser(user as UserAtom);
    }
  }, [accessToken]);

  const logout = async () => {
    try {
      await axios.post(
        `${apiUrl}/auth/logout`,
        {
          token: await getRefreshToken(),
        },
        {
          timeout: 5000,
        },
      );
    } catch (err) {
      // err
    } finally {
      await resetTokens();
    }
  };

  const refresh = async () => {
    try {
      const res = await axios.post(
        `${apiUrl}/auth/refresh`,
        {
          token: await getRefreshToken(),
        },
        {
          timeout: 5000,
        },
      );

      if (!res.data) {
        throw res;
      }

      await setTokens(res.data.accessToken, res.data.refreshToken);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err.response.status === 401) {
          resetTokens();
        }
        log(
          "EROR",
          `Refresh Failed ${JSON.stringify(err.response.data, null, 2)}`,
        );
      } else {
        log("EROR", `Refresh Failed ${err}`);
      }
    }
  };

  return (
    <Provider
      value={{
        accessToken,
        refreshToken,
        getAccessToken,
        getRefreshToken,
        setTokens,
        refresh,
        logout,
      }}>
      {loaded ? children : null}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
