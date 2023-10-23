import React from "react";
import { StyleSheet, View } from "react-native";

import { Screen, Section } from "@app/components";
import { globalColors } from "@app/resources/styles";

const Automation = () => {
  return (
    <Screen
      title="자동화"
      icon="HeaderAutomationSvg"
      description="예기치 못한 소리에 대응할 수 있는 기능이에요.">
      <Section
        title="등록된 자동화"
        buttonTitle="자동화 추가하기"
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

export default Automation;
