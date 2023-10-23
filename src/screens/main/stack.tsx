import type { SvgIconName } from "@app/components";
import type {
  BottomTabDescriptorMap,
  BottomTabNavigationEventMap,
} from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import type {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from "@react-navigation/native";

import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Text, SvgIcon } from "@app/components";
import { globalColors } from "@app/resources/styles";
import { log } from "@app/utils/logging";

import Automation from "./automation";
import Listen from "./listen";
import Settings from "./settings";

interface PageConfig {
  [key: string]: {
    name: string;
    component: React.FC;
  };
}

export type IndexStackParamList = {
  Listen: undefined;
  Automation: undefined;
  Settings: undefined;
};
const Stack = createBottomTabNavigator();
const IndexNavigator = () => {
  const pageConfig: PageConfig = {
    Listen: {
      name: "듣기",
      component: Listen,
    },
    Automation: {
      name: "자동화",
      component: Automation,
    },
    Settings: {
      name: "설정",
      component: Settings,
    },
  };

  log("REND", "Root Stack > Main Stack > Index Stack");
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={(props) => (
        <Navbar
          pageConfig={pageConfig}
          state={props.state}
          descriptors={props.descriptors}
          navigation={props.navigation}
        />
      )}
      initialRouteName="Listen"
      sceneContainerStyle={{
        backgroundColor: "transparent",
      }}>
      {Object.keys(pageConfig).map((key) => (
        <Stack.Screen
          key={key}
          name={key}
          component={pageConfig[key].component}
        />
      ))}
    </Stack.Navigator>
  );
};

interface NavbarProps {
  pageConfig: PageConfig;
  state: TabNavigationState<ParamListBase>;
  descriptors: BottomTabDescriptorMap;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
}
const Navbar: React.FC<NavbarProps> = ({
  pageConfig,
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  log(
    "REND",
    `Root Stack > Main Stack > Index Stack > ${
      Object.keys(pageConfig)[state.index]
    }`,
  );
  return (
    <View
      style={[
        styles.navbar,
        {
          paddingBottom: insets.bottom ? insets.bottom + 2 : 16,
        },
      ]}>
      <View style={styles.corner} />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const title = pageConfig[route.name].name;
        const isFocused = state.index === index;
        return (
          <Pressable
            key={index}
            style={styles.icon}
            testID={options.tabBarTestID}
            onPress={() => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
              ReactNativeHapticFeedback.trigger("soft");
            }}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}>
            <SvgIcon
              name={
                `Navbar${route.name}${
                  isFocused ? "Fill" : ""
                }Svg` as SvgIconName
              }
              fill={isFocused ? globalColors.active : globalColors.grade5}
            />
            <Text
              style={[
                styles.text,
                {
                  fontFamily: isFocused
                    ? "Pretendard-SemiBold"
                    : "Pretendard-Medium",
                  color: isFocused ? globalColors.active : globalColors.grade5,
                },
              ]}>
              {title}
            </Text>
          </Pressable>
        );
      })}
      <View style={styles.corner} />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "stretch",
    backgroundColor: globalColors.grade2,
    padding: 10,
    borderWidth: 1,
    borderColor: globalColors.grade3,
  },
  icon: {
    flex: 8,
    gap: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 12,
    color: globalColors.grade5,
  },
  corner: {
    flex: 1,
  },
});

export default IndexNavigator;
