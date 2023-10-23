import axios, { AxiosError, AxiosRequestConfig } from "axios";

import getEnvVars from "@app/environment";

const { apiUrl } = getEnvVars();

export const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 5 * 1000,
});

export const customAxios = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const source = axios.CancelToken.source();
  const promise = axiosInstance({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data);

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};

export class UnSecretError<T> extends AxiosError<T> {}

export type ErrorType<Error> = AxiosError<Error>;

export type CustomErrorType = UnSecretError<{
  statusCode: number;
  message: string;
}>;