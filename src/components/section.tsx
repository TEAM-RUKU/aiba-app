import type { SvgIconName } from "@app/components";

import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import { Text, SvgIcon } from "@app/components";
import { globalColors } from "@app/resources/styles";

interface SectionProps {
  title: string;
  buttonTitle: string;
  buttonIcon: SvgIconName;
  gap?: number;
  children: React.ReactNode;
}
const Section: React.FC<SectionProps> = ({
  title,
  buttonTitle,
  buttonIcon,
  gap,
  children,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
        <TouchableOpacity
          style={styles.button}
          hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}>
          <SvgIcon name={buttonIcon} fill={globalColors.grade7} />
          <Text style={styles.buttonTitle}>{buttonTitle}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ gap }}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  headerText: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 20,
    color: globalColors.grade7,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  buttonTitle: {
    fontFamily: "Pretendard-Medium",
    fontSize: 16,
    color: globalColors.grade7,
  },
});

export default Section;
