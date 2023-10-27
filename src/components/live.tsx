import React from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

interface LiveProps {
  url: string;
  refresh?: number;
}
const Live: React.FC<LiveProps> = ({ url, refresh }) => {
  return (
    <WebView
      key={refresh}
      scrollEnabled={false}
      source={{
        html: `<style>*{padding: 0; margin:0;}</style><div style="width: 100%; height: 100%; background-size: cover; background-image: url(${url});" />`,
      }}
      style={styles.video}
      startInLoadingState={true}
    />
  );
};

const styles = StyleSheet.create({
  video: {
    flex: 1,
    pointerEvents: "none",
  },
});

export default Live;
