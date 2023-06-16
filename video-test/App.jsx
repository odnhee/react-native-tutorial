import { useEffect, useRef, useState } from "react";
import { View, Alert } from "react-native";
import { captureRef } from "react-native-view-shot";
import { StatusBar } from "expo-status-bar";
import * as MediaLibrary from "expo-media-library";
import * as ScreenOrientation from "expo-screen-orientation";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

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
import {
  registerForPushNotificationsAsync,
  sendPushNotification,
} from "./config/useNotification";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const videoRefs = useRef([]);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [rotate, setRotate] = useState(false);
  const [playStatus, setPlayStatus] = useState({});
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [status, requestPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {}, [isLoading]);

  if (status === null) {
    requestPermission();
  }

  if (rotate === true) {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    );
  } else if (rotate === false) {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }

  /**
   * 스크린샷 함수
   *
   * @param {number} idx - `number`
   * @param {string} title - `string`
   */
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

  /**
   * 라이브 스트리밍 Pause / Play 함수 (실시간 싱크 맞춰 재생)
   *
   * 해당 함수가 실행되기 전, data의 id 값을 별도로 받아온 후 사용
   * @param {number} idx - `number`
   */
  const onVideoControl = (idx) => {
    if (playStatus.isPlaying) {
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

  /**
   * 저장된 영상 Pause / Play (이어서 재생)
   *
   * 해당 함수가 실행되기 전, data의 id 값을 별도로 받아온 후 사용
   * @param {number} idx - `number`
   */
  const onVideoControlNoLive = (idx) => {
    if (playStatus.isPlaying) {
      videoRefs.current[idx].pauseAsync();
    } else {
      videoRefs.current[idx].playAsync();
    }
  };

  const onSoundControl = (idx) => {
    if (!playStatus.isMuted) {
      videoRefs.current[idx].setIsMutedAsync(true);
    } else {
      videoRefs.current[idx].setIsMutedAsync(false);
    }
  };

  /**
   * 푸쉬 알람 함수
   */
  const onSendPush = async () => {
    const title = "Push Test";
    const body = "This is Push test";

    await sendPushNotification(expoPushToken, title, body);

    if (Device.isDevice) {
      console.log(
        `
--- Expo Push ---

Your expo push token: ${expoPushToken}

Title: ${notification && notification.request.content.title}

Body: ${notification && notification.request.content.body}

Data: ${notification && JSON.stringify(notification.request.content.data)}
      `
      );
    } else {
      console.log("Must use physical device for Push Notifications");
    }
  };

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
            onVideoControlNoLive={onVideoControlNoLive}
            res={res}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            onSendPush={onSendPush}
            onSoundControl={onSoundControl}
          />
        </View>
      ))}
    </View>
  );
}
