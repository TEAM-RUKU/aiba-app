import React from "react";
import ReactNativeRecoilPersist, {
  ReactNativeRecoilPersistGate,
} from "react-native-recoil-persist";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import moment from "moment-timezone";
import { RecoilRoot } from "recoil";

import { AuthProvider } from "@app/context/auth";
import App from "@app/index";

moment.tz.setDefault("Asia/Seoul");

const queryClient = new QueryClient();

const Root = () => {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ReactNativeRecoilPersistGate store={ReactNativeRecoilPersist}>
            <AuthProvider>
              <App />
            </AuthProvider>
          </ReactNativeRecoilPersistGate>
        </RecoilRoot>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default Root;
