import React from "react";
import { StyleSheet, View } from "react-native";

import { Screen, Section } from "@app/components";
import { globalColors } from "@app/resources/styles";

const Listen = () => {
  return (
    <Screen
      title="듣기"
      icon="HeaderListenSvg"
      description="하드웨어를 통해 주변 소리를 들어요.">
      <Section
        title="주변 소리 보기"
        buttonTitle="기록된 소리 보기"
        buttonIcon="SectionMicButtonSvg">
        <View style={styles.depth} />
      </Section>
      <Section
        title="대화 기록"
        buttonTitle="전체 대화 보기"
        buttonIcon="SectionChatButtonSvg">
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

export default Listen;
