import type { SvgIconName } from "@app/components";

import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Header } from "@app/components";

interface ScreenProps {
  title: string;
  icon: SvgIconName;
  description: string;
  children: React.ReactNode;
}
const Screen: React.FC<ScreenProps> = ({
  title,
  icon,
  description,
  children,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {
          paddingTop: insets.top + 28,
        },
      ]}>
      <Header title={title} icon={icon} description={description} />
      <View style={styles.list}>{children}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 36,
    gap: 40,
  },
  list: {
    gap: 52,
  },
});

export default Screen;
