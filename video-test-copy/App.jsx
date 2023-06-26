import Main from "./screens/Main";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import { Alert, BackHandler } from "react-native";
import { StatusBar } from "expo-status-bar";
import RNExitApp from "react-native-exit-app";

const Stack = createNativeStackNavigator();

function App() {
  /**
   * 앱 완전 종료 이벤트
   */
  useEffect(() => {
    const backAction = () => {
      Alert.alert("", "앱을 종료하시겠습니까?", [
        { text: "취소", onPress: () => null },
        { text: "확인", onPress: () => RNExitApp.exitApp() },
      ]);

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style={"auto"} />

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
