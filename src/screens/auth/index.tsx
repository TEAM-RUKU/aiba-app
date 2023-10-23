import type { StackNavigationProp } from "@react-navigation/stack";

import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { log } from "@app/utils/logging";
import { stackScreenOptions } from "@app/utils/options";

import Login from "./login";

export type AuthStackParamList = {
  Login: undefined;
};
export type AuthStackNavigationProps = StackNavigationProp<AuthStackParamList>;
const Stack = createStackNavigator();
const AuthStack = () => {
  log("REND", "Root Stack > Auth Stack");
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default AuthStack;
