import type { SvgIconName } from "@app/components";

import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";

import { SvgIcon, Text } from "@app/components";
import { globalColors } from "@app/resources/styles";

interface ButtonProps {
  title: string;
  icon?: SvgIconName;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}
const Button: React.FC<ButtonProps> = ({ title, icon, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      {icon && <SvgIcon name={icon} fill={globalColors.grade7} />}
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: globalColors.grade2,
    borderWidth: 1,
    borderColor: globalColors.grade3,
    borderRadius: 16,
  },
  buttonText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 14,
    color: globalColors.grade7,
  },
});

export default Button;
