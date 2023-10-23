import React from "react";
import { AppRegistry, StatusBar, Platform, LogBox } from "react-native";
import "react-native-gesture-handler";
import { enableFreeze, enableScreens } from "react-native-screens";

import { log } from "@app/utils/logging";

import { name as appName } from "./app.json";
import Root from "./root";

enableFreeze(true);
enableScreens(true);
LogBox.ignoreLogs([
  "Sending `onAnimatedValueUpdate` with no listeners registered.",
  "AxiosError",
]);

const Index = () => {
  log("REND", "INIT");

  StatusBar.setBarStyle("dark-content");
  Platform.OS === "android" && StatusBar.setBackgroundColor("transparent");
  Platform.OS === "android" && StatusBar.setTranslucent(true);

  return <Root />;
};

AppRegistry.registerComponent(appName, () => Index);
