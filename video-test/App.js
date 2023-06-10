import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button } from "react-native";
import { Video, ResizeMode } from "expo-av";
import videoTest from "./assets/test.mp4";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import * as ScreenOrientation from "expo-screen-orientation";
import { useRef } from "react";
import { ScrollView } from "react-native";

const data = [
  {
    id: 0,
    source: { uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4" },
  },
  {
    id: 1,
    source: videoTest,
  },
  // {
  //   id: 2,
  //   source: { uri: "rtsp://172.30.1.17/11" },
  // },
  // {
  //   id: 3,
  //   source: { uri: "http://221.156.189.42:8080" },
  // },
];

export default function App() {
  const videoRefs = useRef([]);

  let captureTime = new Date();

  let year = captureTime.getFullYear(); // 년도
  let month = captureTime.getMonth() + 1; // 월
  let date = captureTime.getDate(); // 날짜

  var hours = ("0" + captureTime.getHours()).slice(-2);
  var minutes = ("0" + captureTime.getMinutes()).slice(-2);
  var seconds = ("0" + captureTime.getSeconds()).slice(-2);

  const [status, requestPermission] = MediaLibrary.usePermissions();

  if (status === null) {
    requestPermission();
  }

  const onSaveImageAsync = async (idx) => {
    try {
      const localUri = await captureRef(videoRefs.current[idx], {
        fileName: `video-${year}-${month}-${date}-${hours}${minutes}${seconds}-`,
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);

      if (localUri) {
        alert("Saved!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const landscapeLeftFunc = (screenState) => {
    if (screenState.fullscreenUpdate === 1) {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
      );
    } else if (screenState.fullscreenUpdate === 3) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />

      {data.map((res) => (
        <View collapsable={false} key={res.id}>
          <Video
            source={res.source}
            shouldPlay
            ref={(el) => (videoRefs.current[res.id] = el)}
            style={{ width: "100%", height: 300, marginTop: 30 }}
            useNativeControls
            resizeMode={ResizeMode.COVER}
            isLooping
            onFullscreenUpdate={(screenState) => landscapeLeftFunc(screenState)}
          />
          <Button
            title="Screen Shot"
            onPress={() => {
              const idx = res.id;
              onSaveImageAsync(idx);
            }}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: "#fff",
  },
});
