import type { StackNavigationProp } from "@react-navigation/stack";

import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { log } from "@app/utils/logging";

import AR from "./screens/ar";

export type ListenStackParamList = {
  AR: undefined;
};
export type ListenStackNavigationProps =
  StackNavigationProp<ListenStackParamList>;
const Stack = createStackNavigator();
const ListenStack = () => {
  log("REND", "Root Stack > Main Stack > Listen Stack");
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
        cardStyle: {
          flex: 1,
        },
      }}>
      <Stack.Screen name="AR" component={AR} />
    </Stack.Navigator>
  );
};

export default ListenStack;
