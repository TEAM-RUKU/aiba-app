import type { SvgIconName } from "@app/components";

import React from "react";
import { StyleSheet, View } from "react-native";

import { SvgIcon, Text } from "@app/components";
import { globalColors } from "@app/resources/styles";

interface HeaderProps {
  title: string;
  icon: SvgIconName;
  description: string;
}
const Header: React.FC<HeaderProps> = ({ title, icon, description }) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerRow}>
        <SvgIcon name={icon} fill={globalColors.grade8} />
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <Text style={styles.headerDescription}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 4,
    gap: 8,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerTitle: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 28,
    color: globalColors.grade9,
  },
  headerDescription: {
    fontFamily: "Pretendard-Medium",
    fontSize: 16,
    color: globalColors.grade7,
  },
});

export default Header;
