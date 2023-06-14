import { useRef, useState } from "react";

import {
  StyleSheet,
  View,
  Button,
  Alert,
  ScrollView,
  Dimensions,
  Platform,
  TouchableOpacity,
  Text,
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
  const [rotate, setRotate] = useState(false);

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

  if (rotate === true) {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    );
  } else if (rotate === false) {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: rotate === false ? "#fff" : "black" },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar style={rotate ? "light" : "auto"} />

      {data.map((res) => (
        <View key={res.id}>
          {rotate === false ? (
            <View>
              <Video
                source={res.source}
                shouldPlay
                ref={(el) => (videoRefs.current[res.id] = el)}
                style={{
                  width: "100%",
                  paddingTop: "56.25%",
                }}
                // useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                // onFullscreenUpdate={(screenState) => landscapeLeftFunc(screenState)}
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
                  onPress={() => setRotate(!rotate)}
                />
              </View>
            </View>
          ) : (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flex: 2,
                width: "100%",
              }}
            >
              <View
                style={{
                  width: "85%",
                  // backgroundColor: "red",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Video
                  source={res.source}
                  shouldPlay
                  ref={(el) => (videoRefs.current[res.id] = el)}
                  style={{
                    width: "85%",
                    paddingTop: "47.8125%",
                  }}
                  // useNativeControls
                  resizeMode={ResizeMode.CONTAIN}
                  isLooping
                  // onFullscreenUpdate={(screenState) => landscapeLeftFunc(screenState)}
                />
              </View>

              <View style={styles.rotateButton}>
                <TouchableOpacity
                  onPress={() => {
                    const idx = res.id;
                    const title = res.title;
                    onSaveImageAsync(idx, title);
                  }}
                >
                  <Text style={{ color: "white", fontSize: 20 }}>HI</Text>
                </TouchableOpacity>
                <Button title={`SF`} onPress={() => setRotate(!rotate)} />
              </View>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
  button: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  rotateButton: {
    display: "flex",
    flexDirection: "column",
    // backgroundColor: "blue",
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
});
