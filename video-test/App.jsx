import { useRef, useState } from "react";
import { View, Alert } from "react-native";
import { captureRef } from "react-native-view-shot";
import { StatusBar } from "expo-status-bar";
import * as MediaLibrary from "expo-media-library";
import * as ScreenOrientation from "expo-screen-orientation";

import PortraitVideo from "./components/PortraitVideo";
import LandscapeVideo from "./components/LandscapeVideo";

import { data } from "./data";
import {
  DATE,
  HOURS,
  MINUTES,
  MONTH,
  SECONDS,
  YEAR,
} from "./config/captureTime";
import { styles } from "./config/globalStyles";

export default function App() {
  const videoRefs = useRef([]);
  const [rotate, setRotate] = useState(false);

  const [status, requestPermission] = MediaLibrary.usePermissions();

  if (status === null) {
    requestPermission();
  }

  const onSaveImageAsync = async (idx, title) => {
    try {
      const localUri = await captureRef(videoRefs.current[idx], {
        fileName: `${title}-${YEAR}-${MONTH}-${DATE}-${HOURS}${MINUTES}${SECONDS}-`,
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
    <View
      style={[
        styles.container,
        {
          backgroundColor: rotate === false ? "#fff" : "black",
          flex: 2,
          justifyContent: "center",
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar style={rotate ? "light" : "auto"} />

      {data.map((res) => (
        <View key={res.id}>
          {!rotate ? (
            <PortraitVideo
              videoRefs={videoRefs}
              rotate={rotate}
              setRotate={setRotate}
              onSaveImageAsync={onSaveImageAsync}
              res={res}
            />
          ) : (
            <LandscapeVideo
              videoRefs={videoRefs}
              rotate={rotate}
              setRotate={setRotate}
              onSaveImageAsync={onSaveImageAsync}
              res={res}
            />
          )}
        </View>
      ))}
    </View>
  );
}
