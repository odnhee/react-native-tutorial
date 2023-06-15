import { useEffect, useRef, useState } from "react";
import { View, Alert, Button } from "react-native";
import { captureRef } from "react-native-view-shot";
import { StatusBar } from "expo-status-bar";
import * as MediaLibrary from "expo-media-library";
import * as ScreenOrientation from "expo-screen-orientation";

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
import VideoSection from "./components/VideoSection";
import Skeleton from "./components/Skeleton";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const videoRefs = useRef([]);
  const [rotate, setRotate] = useState(false);
  const [playStatus, setPlayStatus] = useState({});

  const [status, requestPermission] = MediaLibrary.usePermissions();

  if (status === null) {
    requestPermission();
  }

  const onSaveImageAsync = async (idx, title) => {
    try {
      const localUri = await captureRef(videoRefs.current[idx], {
        fileName: `${title}-${YEAR}-${MONTH}-${DATE}-${HOURS}${MINUTES}${SECONDS}-`,
        quality: 1,
        format: "png",
      });

      await MediaLibrary.saveToLibraryAsync(localUri);

      if (localUri) {
        Alert.alert("영상을 캡쳐했습니다.", `${title}가 갤러리에 저장됩니다.`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onVideoControl = (idx) =>
    playStatus.isPlaying
      ? videoRefs.current[idx].pauseAsync()
      : videoRefs.current[idx].playAsync();

  if (rotate === true) {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    );
  } else if (rotate === false) {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }
  useEffect(() => {
    console.log("isLoading", isLoading);
  }, [isLoading]);
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
          <VideoSection
            playStatus={playStatus}
            setPlayStatus={setPlayStatus}
            videoRefs={videoRefs}
            rotate={rotate}
            setRotate={setRotate}
            onSaveImageAsync={onSaveImageAsync}
            onVideoControl={onVideoControl}
            res={res}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </View>
      ))}
    </View>
  );
}
