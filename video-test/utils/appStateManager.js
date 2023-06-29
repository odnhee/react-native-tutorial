import { Alert, BackHandler } from "react-native";

export const backAction = () => {
  Alert.alert("", "앱을 종료하시겠습니까?", [
    { text: "취소", onPress: () => null },
    // { text: "확인", onPress: () => RNExitApp.exitApp() },
    { text: "확인", onPress: () => BackHandler.exitApp() },
  ]);

  return true;
};

export const backgroundAction = () => {
  BackHandler.exitApp();
  console.log("앱 종료");
};
