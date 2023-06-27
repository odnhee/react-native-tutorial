import { useEffect, useRef, useState } from "react";
import { View, Alert, Text, Pressable } from "react-native";
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import * as ScreenOrientation from "expo-screen-orientation";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import * as KakaoLogins from "@react-native-seoul/kakao-login";
import { data } from "../data";
import {
  DATE,
  HOURS,
  MINUTES,
  MONTH,
  SECONDS,
  YEAR,
} from "../config/captureTime";
import { styles } from "../config/globalStyles";
import VideoSection from "../components/VideoSection";
import {
  registerForPushNotificationsAsync,
  schedulePushNotification,
} from "../config/useNotification";
import { useNavigation } from "@react-navigation/native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function Main() {
  const videoRefs = useRef([]);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [rotate, setRotate] = useState(false);
  const [playStatus, setPlayStatus] = useState({});
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [storeData, setStoreData] = useState([]);
  const navigation = useNavigation();

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

  useEffect(() => {
    if (
      (notification && notification.request.content.data.type) === "warning" &&
      Device.isDevice
    ) {
      onSaveImageAsync(0, "Warning");
      console.log(expoPushToken);
    } else {
      console.log("Must use physical device for Push Notifications");
    }
  }, [notification]);

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

  /** 선택한 사진 저장하기 */
  const onSave = () => {
    storeData.map(async (data) => {
      await MediaLibrary.saveToLibraryAsync(data.uri);
    });
  };
  /** 사진 선택
   *  selectStorage에 저장
   *
   */
  const selectToSave = (uri) => {
    const date = new Date();
    const _data = {
      date: date.toLocaleDateString(),
      time: date.toTimeString().split(" ", 1)[0],
      uri: uri,
    };
    if (storeData.length === 0) {
      setStoreData([_data]);
    } else {
      // const dummy = [...storeData, _data];
      // console.log("storeData", storeData);
      // console.log("_data", _data);
      // console.log("dummy", dummy);
      setStoreData([...storeData, _data]);
    }
  };

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

      // await MediaLibrary.saveToLibraryAsync(localUri);
      console.log("save");
      selectToSave(localUri);
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

  /**
   * 음소거 함수
   *
   * 해당 함수가 실행되기 전, data의 id 값을 별도로 받아온 후 사용
   * @param {number} idx - `number`
   */
  const onSoundControl = (idx) => {
    if (!playStatus.isMuted) {
      videoRefs.current[idx].setIsMutedAsync(true);
    } else {
      videoRefs.current[idx].setIsMutedAsync(false);
    }
  };

  /**
   * 푸쉬 알람 함수
   *
   * type에 따라 이벤트 값 변동 (ex: warning -> 스크린샷)
   * @param {string} type - `string`
   */
  const onSendPush = async (type) => {
    const title = type.toUpperCase();
    const body = "위험이 감지되어 화면을 촬영했습니다.";

    schedulePushNotification(title, body, type);
  };

  const getInfo = () => {
    KakaoLogins.getProfile()
      .then((result) => {
        console.log(`Login Finished:${JSON.stringify(result)}`);
        // 이후 result.id를 활용해서 로그인 로직을 구현
        console.log(`
email: ${result.email}
nickname: ${result.nickname}
`);
      })
      .catch((err) => {
        console.log(`Get Profile Failed:${err.code} ${err.message}`);
      });
  };

  const logout = () => {
    KakaoLogins.logout().then(() => {
      navigation.navigate("Login");
    });
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

      <View
        style={{
          alignItems: "center",
          marginTop: 30,
          display: rotate ? "none" : "flex",
        }}
      >
        <Pressable onPress={getInfo}>
          <Text style={{ fontSize: 15 }}>Kakao Profile</Text>
        </Pressable>

        <Pressable onPress={logout}>
          <Text style={{ fontSize: 15 }}>Kakao Logout</Text>
        </Pressable>
        <Pressable onPress={onSave}>
          <Text style={{ fontSize: 15 }}>onSave</Text>
        </Pressable>
      </View>
    </View>
  );
}
