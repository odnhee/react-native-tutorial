import Main from "./screens/Main";
import React, { useEffect, useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import { Alert, BackHandler } from "react-native";
import { StatusBar } from "expo-status-bar";
import RNExitApp from "react-native-exit-app";
import KakaoLogin from "./screens/KakaoLogin";
import BuoyInfo from "./screens/BuoyInfo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BuoyDetail from "./screens/BuoyDetail";
import { backAction, backgroundAction } from "./utils/backActions";
import { RecoilRoot } from "recoil";

const Stack = createNativeStackNavigator();

function App() {
  const [hi, setHi] = useState(true);
  useEffect(() => {
    // if (url === "Home") {
    //   const backHandler = BackHandler.addEventListener(
    //     "hardwareBackPress",
    //     backAction
    //     // () =>backAction(setHi)
    //   );

    //   return () => backHandler.remove();
    // }
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      // backAction
      () => backAction(setHi)
    );

    return () => backHandler.remove();
  }, []);
  /**
   * 앱 완전 종료 이벤트
   * "appstate",를 통해서
   */

  const queryClient = new QueryClient();
  useEffect(() => {
    setHi(true);
  }, [hi]);
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* <Stack.Screen name="/" component={Login} />
            <Stack.Screen name="KakaoLogin" component={KakaoLogin} /> */}
            <Stack.Screen name="Home" component={Main} />
            <Stack.Screen name="Buoy" component={BuoyInfo} />
            <Stack.Screen name="BuoyDetail" component={BuoyDetail} />
          </Stack.Navigator>
          <StatusBar style={"auto"} />
        </NavigationContainer>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
