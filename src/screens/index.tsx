import type { AuthStackParamList } from "./auth";
import type { MainStackParamList } from "./main";
import type { NavigatorScreenParams } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

import React from "react";
import BootSplash from "react-native-bootsplash";

import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthContext } from "@app/context/auth";
import { log } from "@app/utils/logging";

import Auth from "./auth";
import Main from "./main";

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainStackParamList>;
};
export type RootStackNavigationProps = StackNavigationProp<RootStackParamList>;
const Stack = createStackNavigator<RootStackParamList>();
const Root = () => {
  const navigation = useNavigation<RootStackNavigationProps>();

  const { accessToken } = React.useContext(AuthContext);

  const target = accessToken ? "Main" : "Auth";
  React.useEffect(() => {
    if (navigation.getState()?.routes[0].name !== target)
      navigation.reset({
        index: 0,
        routes: [
          {
            name: target,
          },
        ],
      });

    BootSplash.hide({
      fade: true,
    });
  }, [accessToken]);

  log("REND", "Root Stack");
  return (
    <Stack.Navigator
      initialRouteName={target}
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
        gestureEnabled: false,
        cardStyle: {
          flex: 1,
        },
      }}>
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="Main" component={Main} />
    </Stack.Navigator>
  );
};

export default Root;
