import { useCallback, useEffect, useRef, useState } from "react";
import { View, Alert, Pressable, Text, BackHandler } from "react-native";
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import * as ScreenOrientation from "expo-screen-orientation";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import * as SMS from "expo-sms";

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
import { useBuoyOxygen } from "../api/useBuoyOxygen";
import { useRecoilValue } from "recoil";
import { foreground } from "../recoil/atoms";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function Main({ navigation, route, setUrl, url }) {
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
  const [smsAvailable, setSmsAvailable] = useState(false);

  const [status, requestPermission] = MediaLibrary.usePermissions();
  const { data: testData } = useBuoyOxygen(10);

  const accessToken = AsyncStorage.getItem("userAccessToken");
  const refreshToken = AsyncStorage.getItem("userRefreshToken");

  const isforeground = useRecoilValue(foreground);

  useFocusEffect(
    useCallback(() => {
      setUrl(route.name);
    }, [])
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
   * SMS 권한 체크
   */
  useEffect(() => {
    const checkSmsAvailable = async () => {
      const isSmsAvailable = await SMS.isAvailableAsync();
      setSmsAvailable(isSmsAvailable);
    };

    checkSmsAvailable();
  }, []);

  /**
   * 토큰 체크 함수
   */
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

  /**
   * 라이브 스트리밍 비디오 불러오는 함수
   */
  useFocusEffect(
    useCallback(() => {
      axios({
        method: "get",
        url: "https://aws-cli-deploy-test-hhj.s3.ap-northeast-2.amazonaws.com/VideoLink.txt",
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      })
        .then((res) => {
          setVideoUrl(res.data);
          console.log(videoUrl);
        })
        .catch((err) => console.log(err));
    }, [videoUrl])
  );

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

  /**
   * SMS 보내기 함수
   */
  const sendSMS = async () => {
    const location = await testData?.map((res) => res?.location.address)[0];
    const coordinate = await testData?.map(
      (res) => res?.location.coordinate
    )[0];

    await SMS.sendSMSAsync(
      ["01020674413"], // ["122"],
      `
사고 작업장 위치 : ${location}
사고 작업장 좌표 : ${coordinate[0]} ${coordinate[1]}
      `
    );

    console.log(coordinate[0], coordinate[1]);
  };

  /**
   * 앱 완전 종료 이벤트
   */
  useEffect(() => {
    if (url === "Home") {
      const backAction = () => {
        Alert.alert("", "앱을 종료하시겠습니까?", [
          { text: "취소", onPress: () => null },
          // { text: "확인", onPress: () => RNExitApp.exitApp() },
          {
            text: "확인",
            onPress: () => {
              if (isforeground === true) {
                navigation.navigate("Splash");
              }

              BackHandler.exitApp();
            },
          },
        ]);

        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }
  }, [url]);

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
            navigation={navigation}
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
            sendSMS={sendSMS}
            smsAvailable={smsAvailable}
          />
        </View>
      ))}

      <KakaoSection
        getInfo={getInfo}
        logout={logout}
        unlink={unlink}
        setModalVisible={setModalVisible}
        rotate={rotate}
        navigation={navigation}
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

      <PickerSection
        rotate={rotate}
        testValue={testValue}
        setTestValue={setTestValue}
      />
    </View>
  );
}
