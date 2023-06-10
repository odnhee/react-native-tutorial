import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button, Alert } from "react-native";
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
    title: "Bunny Video",
  },
  {
    id: 1,
    source: videoTest,
    title: "Drone Test Video",
  },
  {
    id: 2,
    source: {
      uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    },
    title: "Elephants Dream Video",
  },
  {
    id: 3,
    source: {
      uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    },
    title: "For Bigger Blazes Video",
  },
  {
    id: 4,
    source: {
      uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    },
    title: "For Bigger Escapes Video",
  },
  // {
  //   id: 5,
  //   source: { uri: "rtsp://172.30.1.17/11" },
  //   title: "Cam_1",
  // },
  // {
  //   id: number,
  //   source: { uri: "http://221.156.189.42:8080" },
  // },
];

export default function App() {
  const videoRefs = useRef([]);
  const [status, requestPermission] = MediaLibrary.usePermissions();

  let captureTime = new Date();

  let year = captureTime.getFullYear(); // 년도
  let month = captureTime.getMonth() + 1; // 월
  let date = captureTime.getDate(); // 날짜

  var hours = ("0" + captureTime.getHours()).slice(-2);
  var minutes = ("0" + captureTime.getMinutes()).slice(-2);
  var seconds = ("0" + captureTime.getSeconds()).slice(-2);

  if (status === null) {
    requestPermission();
  }

  const onSaveImageAsync = async (idx, title) => {
    try {
      const localUri = await captureRef(videoRefs.current[idx], {
        fileName: `${title}-${year}-${month}-${date}-${hours}${minutes}${seconds}-`,
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);

      if (localUri) {
        Alert.alert("영상을 캡쳐했습니다.", `${title}가 갤러리에 저장됩니다.`);
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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

          <View style={styles.button}>
            <Button
              title={`${res.title} Screen Shot`}
              onPress={() => {
                const idx = res.id;
                const title = res.title;
                onSaveImageAsync(idx, title);
              }}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: "#fff",
  },
  button: {
    alignItems: "center",
    marginTop: 10,
  },
});
