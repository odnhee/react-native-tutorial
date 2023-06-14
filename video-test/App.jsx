import { useRef } from "react";

import {
  StyleSheet,
  View,
  Button,
  Alert,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import { captureRef } from "react-native-view-shot";

import { StatusBar } from "expo-status-bar";
import { Video, ResizeMode } from "expo-av";
import Constants from "expo-constants";
import * as MediaLibrary from "expo-media-library";
import * as ScreenOrientation from "expo-screen-orientation";

import { data } from "./data";

export default function App() {
  const videoRefs = useRef([]);
  const [status, requestPermission] = MediaLibrary.usePermissions();

  const videoWidth = Dimensions.get("window").width;
  const videoHeight = (parseInt(videoWidth) / 16) * 9;

  console.log(
    `${Platform.OS} w -> ${videoWidth}`,
    "/",
    `${Platform.OS} h -> ${videoHeight}`
  );

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
        width: videoWidth,
        height: videoHeight,
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

  const landscapeLeftFunc = async (screenState) => {
    if (screenState.fullscreenUpdate === 1) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
      );
    } else if (screenState.fullscreenUpdate === 3) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar style="auto" />

      {data.map((res) => (
        <View key={res.id}>
          <Video
            source={res.source}
            shouldPlay
            ref={(el) => (videoRefs.current[res.id] = el)}
            style={{ width: videoWidth, paddingTop: videoHeight }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
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
          <View style={styles.button}>
            <Button
              title={`setFullScreen`}
              onPress={() => {
                videoRefs.current[res.id].presentFullscreenPlayer();
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
    marginTop: Constants.statusBarHeight,
    backgroundColor: "#fff",
  },
  button: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
});
