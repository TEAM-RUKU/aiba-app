import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import { Screen, Section, Text, SvgIcon } from "@app/components";
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
        <View style={styles.automation}>
          <View style={styles.automationHeader}>
            <View style={styles.automationHeaderVisualization}>
              <SvgIcon
                name="AutomationVisualizationIfSvg"
                fill={globalColors.grade5}
              />
              <SvgIcon
                name="AutomationVisualizationArrowSvg"
                fill={globalColors.grade5}
              />
              <SvgIcon
                name="AutomationVisualizationRecordSvg"
                fill={globalColors.grade5}
              />
            </View>
            <TouchableOpacity
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
              <SvgIcon name="AutomationDeleteSvg" fill={globalColors.grade7} />
            </TouchableOpacity>
          </View>
          <View style={styles.automationList}>
            <View style={styles.automationItem}>
              <SvgIcon
                name="AutomationItemDeviceSvg"
                fill={globalColors.grade7}
              />
              <Text
                style={[styles.automationName, styles.automationNameDevice]}>
                AIBA Prototype에서
              </Text>
            </View>
            <View style={styles.automationItem}>
              <SvgIcon name="AutomationItemIfSvg" fill={globalColors.grade8} />
              <Text style={[styles.automationName, styles.automationNameIf]}>
                호시노 아이의 목소리가 들리면
              </Text>
            </View>
            <View style={styles.automationItem}>
              <SvgIcon
                name="AutomationItemThenSvg"
                fill={globalColors.active}
              />
              <Text style={[styles.automationName, styles.automationNameThen]}>
                알림 보내주기
              </Text>
            </View>
          </View>
        </View>
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
  automation: {
    gap: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: globalColors.grade3,
    borderRadius: 16,
    backgroundColor: globalColors.grade2,
  },
  automationHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  automationHeaderVisualization: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  automationList: {
    gap: 6,
  },
  automationItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  automationName: {
    fontFamily: "Pretendard-Medium",
    fontSize: 16,
  },
  automationNameDevice: {
    color: globalColors.grade7,
  },
  automationNameIf: {
    color: globalColors.grade8,
  },
  automationNameThen: {
    fontFamily: "Pretendard-SemiBold",
    color: globalColors.active,
  },
});

export default Automation;
