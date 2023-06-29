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
import { backAction, backgroundAction } from "./utils/appStateManager";
import { AppState } from "react-native";

const Stack = createNativeStackNavigator();

function App() {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [is, setIs] = useState(true);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        setIs(true);
        console.log("App has come to the foreground!");
      } else if (
        appState.current.match(/active/) &&
        nextAppState === "background"
      ) {
        setIs(false);
        console.log("background!");
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log("AppState", appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);
  useEffect(() => {
    console.log("appStateVisible", appStateVisible);
  }, []);
  /**
   * 앱 완전 종료 이벤트
   * "appstate",를 통해서
   */
  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     () => {
  //       console.log("hihih");
  //     }
  //     // backAction
  //   );

  //   return () => backHandler.remove();
  // }, []);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StatusBar style={"auto"} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="/" component={Login} />
          <Stack.Screen name="KakaoLogin" component={KakaoLogin} /> */}
          <Stack.Screen name="Home" component={Main} />
          <Stack.Screen name="Buoy" component={BuoyInfo} />
          <Stack.Screen name="BuoyDetail" component={BuoyDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
