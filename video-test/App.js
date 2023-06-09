import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { Video, ResizeMode } from "expo-av";
import videoTest from "./assets/test.mp4";
import * as React from "react";

export default function App() {
  const [status, setStatus] = React.useState({});
  const video = React.useRef(null);

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={{ width: "100%", height: 300, marginTop: 20 }}
        // source={{
        //   uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        // }}
        source={videoTest}
        // source={{ uri: "http://119.206.179.62:8080" }}
        useNativeControls
        resizeMode={ResizeMode.COVER}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <Video
        ref={video}
        style={{ width: "100%", height: 300 }}
        // source={{
        //   uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        // }}
        source={videoTest}
        useNativeControls
        resizeMode={ResizeMode.COVER}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      {/* <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 30,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
