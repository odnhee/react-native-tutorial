import Main from "./screens/Main";
import React, { useEffect } from "react";
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

const Stack = createNativeStackNavigator();

function App() {
  // /**
  //  * 앱 완전 종료 이벤트
  //  */
  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert("", "앱을 종료하시겠습니까?", [
  //       { text: "취소", onPress: () => null },
  //       // { text: "확인", onPress: () => RNExitApp.exitApp() },
  //       { text: "확인", onPress: () => BackHandler.exitApp() },
  //     ]);

  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   return () => backHandler.remove();
  // }, []);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StatusBar style={"auto"} />

        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="/" component={Login} />
          <Stack.Screen name="KakaoLogin" component={KakaoLogin} />
          <Stack.Screen name="Home" component={Main} />
          <Stack.Screen name="Buoy" component={BuoyInfo} />
          <Stack.Screen name="BuoyDetail" component={BuoyDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
