import { useCallback, useEffect, useRef, useState } from "react";
import { View, Alert, Pressable, Text } from "react-native";
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import * as ScreenOrientation from "expo-screen-orientation";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

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
import axios from "axios";
import KakaoSection from "../components/KakaoSection";
import ModalSection from "../components/ModalSection";
import PickerSection from "../components/PickerSection";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function Main({ navigation, route, setUrl }) {
  const videoRefs = useRef([]);
  const notificationListener = useRef("");

  const [rotate, setRotate] = useState(false);
  const [playStatus, setPlayStatus] = useState({});
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [testValue, setTestValue] = useState();
  const [userProfile, setUserProfile] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const [status, requestPermission] = MediaLibrary.usePermissions();

  const accessToken = AsyncStorage.getItem("userAccessToken");
  const refreshToken = AsyncStorage.getItem("userRefreshToken");

  useEffect(() => {
    const checkToken = async () => {
      if (accessToken || refreshToken === null) {
        return true;
      } else {
        navigation.navigate("/");
      }
    };

    checkToken();
  }, [accessToken, refreshToken]);

  useFocusEffect(
    useCallback(() => {
      setUrl(route.name);
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      axios({
        method: "get",
        url: "https://aws-cli-deploy-test-hhj.s3.ap-northeast-2.amazonaws.com/VideoLink.rtf",
      })
        .then((res) => {
          const exp = "kerning0\n";
          var condition = res.data.indexOf(exp);

          const https = res.data.substring(condition + exp.length);

          setVideoUrl(https.slice(0, -1));
        })
        .catch((err) => console.log(err));
    }, [videoUrl])
  );

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

  /**
   * 카카오 로그인 후, 유저 프로필 받는 함수
   */
  const getInfo = async () => {
    let keys = [];
    try {
      const accessToken = await AsyncStorage.getItem("userAccessToken");
      const refreshToken = await AsyncStorage.getItem("userRefreshToken");

      if (accessToken !== null) {
        axios({
          method: "get",
          url: "https://kapi.kakao.com/v2/user/me",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then(async (res) => {
            setUserProfile({
              userAccessToken: accessToken,
              Name: res.data.kakao_account.name,
              Email: res.data.kakao_account.email,
              Phone: res.data.kakao_account.phone_number,
              Image: res.data.kakao_account.profile.profile_image_url,
            });

            keys = await AsyncStorage.getAllKeys();
            console.log(`
${keys[0]} -> ${accessToken}

${keys[1]} -> ${refreshToken}
            `);
          })
          .catch((err) => {
            console.log(`Error : ${err}`);
          });
      }
    } catch (err) {
      console.log("error", accessToken);
    }
  };

  /**
   * 카카오 로그아웃 함수
   */
  const logout = async () => {
    const accessToken = await AsyncStorage.getItem("userAccessToken");

    axios({
      method: "post",
      url: "https://kapi.kakao.com/v1/user/logout",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(() => {
        console.log("Lougout");
        AsyncStorage.multiRemove(["userAccessToken", "userRefreshToken"]);
        navigation.navigate("/");
      })
      .catch((err) => {
        console.log(`Error : ${err}`);
      });
  };

  /**
   * 카카오 연결 해제 함수
   */
  const unlink = async () => {
    const accessToken = await AsyncStorage.getItem("userAccessToken");

    axios({
      method: "get",
      url: "https://kapi.kakao.com/v1/user/unlink",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(() => {
        console.log("Unlink");
        AsyncStorage.multiRemove(["userAccessToken", "userRefreshToken"]);
        navigation.navigate("/");
      })
      .catch((err) => {
        console.log(`Error : ${err}`);
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
            videoUrl={videoUrl}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            onSendPush={onSendPush}
            onSoundControl={onSoundControl}
          />
        </View>
      ))}

      <KakaoSection
        getInfo={getInfo}
        logout={logout}
        unlink={unlink}
        setModalVisible={setModalVisible}
        rotate={rotate}
      />

      <ModalSection
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        userProfile={userProfile}
      />

      <Pressable
        onPress={() => {
          navigation.navigate("Buoy");
          setUrl("Buoy");
        }}
        style={{
          paddingBottom: 10,
          alignItems: "center",
          display: rotate ? "none" : "flex",
        }}
      >
        <Text style={{ fontSize: 20 }}>Buoy Info</Text>
      </Pressable>

      <PickerSection
        rotate={rotate}
        testValue={testValue}
        setTestValue={setTestValue}
      />
    </View>
  );
}
