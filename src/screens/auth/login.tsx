import type { KakaoOAuthToken } from "@react-native-seoul/kakao-login";

import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { login } from "@react-native-seoul/kakao-login";

import { useAuthControllerLogin } from "@app/api/endpoints/auth/auth";
import { Text, Button } from "@app/components";
import { AuthContext } from "@app/context/auth";
import { globalColors } from "@app/resources/styles";
import { log } from "@app/utils/logging";

const Login = () => {
  const insets = useSafeAreaInsets();

  const { setTokens } = React.useContext(AuthContext);

  const { mutateAsync: loginAsync } = useAuthControllerLogin();

  const kakaoLogin = async () => {
    let kakaoToken: KakaoOAuthToken;
    try {
      kakaoToken = await login();
    } catch (e) {
      return log("EROR", `Kakao Login ${e.name}`);
    }

    try {
      const loginToken = await loginAsync({
        data: {
          token: kakaoToken.accessToken,
        },
      });

      setTokens(loginToken.accessToken, loginToken.refreshToken);
    } catch (e) {
      return log("EROR", `Login ${e.name}`);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom + 20,
        },
      ]}>
      <View style={styles.content}>
        <Text style={styles.brand}>
          AIBA<Text style={styles.brandDot}>.</Text>
        </Text>
      </View>
      <Button
        title="카카오톡으로 로그인"
        icon="LoginButtonSvg"
        onPress={kakaoLogin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  brand: {
    fontFamily: "Pretendard-Bold",
    fontSize: 72,
    letterSpacing: -72 * 0.04,
    color: globalColors.grade10,
  },
  brandDot: {
    color: globalColors.active,
  },
});

export default Login;
