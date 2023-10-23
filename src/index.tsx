import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import { globalColors } from "@app/resources/styles";
import { log } from "@app/utils/logging";

import Root from "./screens";

const App = () => {
  const onReady = () => {
    log("REND", "onLayout app");
  };

  log("REND", "app");
  return (
    <NavigationContainer
      theme={{
        dark: false,
        colors: {
          primary: globalColors.active,
          background: globalColors.grade1,
          card: globalColors.grade1,
          border: globalColors.grade1,
          text: globalColors.active,
          notification: globalColors.active,
        },
      }}
      onReady={onReady}>
      <Root />
    </NavigationContainer>
  );
};

export default App;
