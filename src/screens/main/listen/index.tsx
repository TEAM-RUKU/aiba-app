import type { MainStackNavigationProps } from "../";

import React from "react";
import { StyleSheet, View } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Screen, Section, Button, Live } from "@app/components";
import { globalColors } from "@app/resources/styles";

const Listen = () => {
  const navigation = useNavigation<MainStackNavigationProps>();

  const [refresh, setRefresh] = React.useState<number>(0);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setRefresh((pre) => pre + 1);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Screen
      title="듣기"
      icon="HeaderListenSvg"
      description="하드웨어를 통해 주변 소리를 들어요.">
      <Section
        title="주변 소리 보기"
        buttonTitle="기록된 소리 보기"
        buttonIcon="SectionMicButtonSvg"
        gap={16}>
        <View style={styles.depth}>
          <Live
            url="http://192.168.2.2:8000/v1/stream/tdoa"
            refresh={refresh}
          />
        </View>
        <View style={styles.buttonRow}>
          <Button
            title="증강현실 보기"
            icon="ARButtonSvg"
            style={styles.button}
            onPress={() => {
              navigation.navigate("ListenStack", {
                screen: "AR",
              });
            }}
          />
          <Button
            title="이 소리 기록하기"
            icon="ARButtonSvg"
            style={styles.button}
          />
        </View>
      </Section>
    </Screen>
  );
};

const styles = StyleSheet.create({
  depth: {
    overflow: "hidden",
    backgroundColor: globalColors.grade2,
    borderRadius: 16,
    aspectRatio: 1,
  },
  video: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
  },
});

export default Listen;
