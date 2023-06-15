import { useRef, useState } from "react";
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

export default function App() {
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

  const onVideoControl = (idx) => {
    if (playStatus.isPlaying === true) {
      videoRefs.current[idx].pauseAsync();
      console.log(playStatus.positionMillis);
    } else {
      videoRefs.current[idx].playFromPositionAsync(
        playStatus.durationMillis - playStatus.positionMillis
      );

      if (playStatus.positionMillis <= 1000) {
        videoRefs.current[idx].playFromPositionAsync(1000);
      }
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
          <VideoSection
            playStatus={playStatus}
            setPlayStatus={setPlayStatus}
            videoRefs={videoRefs}
            rotate={rotate}
            setRotate={setRotate}
            onSaveImageAsync={onSaveImageAsync}
            onVideoControl={onVideoControl}
            res={res}
          />
        </View>
      ))}
    </View>
  );
}
