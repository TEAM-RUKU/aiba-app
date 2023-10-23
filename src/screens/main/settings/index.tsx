import React from "react";
import { StyleSheet, View } from "react-native";

import { Screen, Section } from "@app/components";
import { globalColors } from "@app/resources/styles";

const Settings = () => {
  return (
    <Screen
      title="설정"
      icon="HeaderSettingsSvg"
      description="장치를 추가하거나 각종 설정을 변경해요.">
      <Section
        title="장치 관리하기"
        buttonTitle="장치 추가하기"
        buttonIcon="SectionAddButtonSvg">
        <View style={styles.depth} />
      </Section>
    </Screen>
  );
};

const styles = StyleSheet.create({
  depth: {
    height: 195,
    backgroundColor: globalColors.grade2,
    borderRadius: 16,
  },
});

export default Settings;
