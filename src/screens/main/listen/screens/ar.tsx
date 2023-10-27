import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Voice from "@react-native-voice/voice";

import { Live, Text } from "@app/components";
import { globalColors } from "@app/resources/styles";

const AR = () => {
  const insets = useSafeAreaInsets();

  const [isRecord, setIsRecord] = React.useState<boolean>(false);
  const [text, setText] = React.useState<string>("");

  const _onSpeechStart = () => {
    console.log("onSpeechStart");
    setText("");
  };
  const _onSpeechEnd = () => {
    console.log("onSpeechEnd");
  };
  const _onSpeechResults = (event) => {
    console.log("onSpeechResults");
    setText(event.value[0]);
  };
  const _onSpeechError = (event) => {
    console.log("_onSpeechError");
    console.log(event.error);
  };

  const _onRecordVoice = () => {
    if (isRecord) {
      Voice.stop();
    } else {
      Voice.start("ko-KR");
    }
    setIsRecord(!isRecord);
  };

  React.useEffect(() => {
    Voice.onSpeechStart = _onSpeechStart;
    Voice.onSpeechEnd = _onSpeechEnd;
    Voice.onSpeechResults = _onSpeechResults;
    Voice.onSpeechError = _onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Live url="http://192.168.219.112:8000/v1/stream/yolo" />
      <View
        style={[
          styles.menu,
          {
            paddingBottom: insets.bottom + 14,
          },
        ]}>
        <View style={styles.menuRow}>
          <Text style={styles.menuTitle}>현재 대화</Text>
          <TouchableOpacity onPress={_onRecordVoice}>
            <Text style={styles.record}>이 대화 & 장면 기록하기</Text>
          </TouchableOpacity>
        </View>
        <Chat text={text} />
      </View>
    </View>
  );
};

interface ChatProps {
  text: string;
}
const Chat: React.FC<ChatProps> = ({ text }) => {
  return (
    <View style={styles.chat}>
      <Text style={styles.chatText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menu: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: globalColors.grade1,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    paddingHorizontal: 28,
    paddingTop: 20,
    gap: 28,
  },
  menuRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuTitle: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 24,
    color: globalColors.grade9,
  },
  record: {
    fontFamily: "Pretendard-Medium",
    fontSize: 16,
    color: globalColors.grade7,
  },
  chat: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: globalColors.grade3,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  chatText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 14,
    color: globalColors.grade7,
  },
});

export default AR;
