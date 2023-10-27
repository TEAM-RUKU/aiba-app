import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Screen, Section, SvgIcon, Text } from "@app/components";
import { AuthContext } from "@app/context/auth";
import { globalColors } from "@app/resources/styles";

const Settings = () => {
  const { logout } = React.useContext(AuthContext);

  return (
    <Screen
      title="설정"
      icon="HeaderSettingsSvg"
      description="장치를 추가하거나 각종 설정을 변경해요.">
      <Section
        title="장치 관리하기"
        buttonTitle="장치 추가하기"
        buttonIcon="SectionAddButtonSvg"
        gap={12}>
        <Device name="AIBA Prototype" />
      </Section>
      <View style={{ flex: 1 }} />
      <View style={styles.info}>
        <Text style={styles.infoText}>앱 버전 1.0.0</Text>
        <TouchableOpacity onPress={logout}>
          <Text style={[styles.infoText, styles.infoTextBold]}>
            오픈소스 라이선스 보기
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

interface DeviceProps {
  name: string;
}

const Device: React.FC<DeviceProps> = ({ name }) => {
  return (
    <View style={styles.device}>
      <SvgIcon name="DeviceSvg" fill={globalColors.grade7} />
      <Text style={styles.deviceName}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  device: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: globalColors.grade3,
    borderRadius: 16,
    backgroundColor: globalColors.grade2,
  },
  deviceName: {
    fontFamily: "Pretendard-Medium",
    fontSize: 14,
    color: globalColors.grade7,
  },
  info: {
    gap: 12,
    paddingHorizontal: 4,
  },
  infoText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 14,
    color: globalColors.grade6,
  },
  infoTextBold: {
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
    textDecorationColor: globalColors.grade7,
    color: globalColors.grade7,
  },
});

export default Settings;
