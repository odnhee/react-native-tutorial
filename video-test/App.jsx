import Main from "./screens/Main";
import React, { useEffect, useState } from "react";
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
  const [url, setUrl] = useState("");

  useEffect(() => {
    console.log(url);
  }, [url]);

  /**
   * 앱 완전 종료 이벤트
   */
  useEffect(() => {
    if (url === "Home") {
      const backAction = () => {
        Alert.alert("", "앱을 종료하시겠습니까?", [
          { text: "취소", onPress: () => null },
          // { text: "확인", onPress: () => RNExitApp.exitApp() },
          { text: "확인", onPress: () => BackHandler.exitApp() },
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

  const queryClient = new QueryClient();
  useEffect(() => {
    setHi(true);
  }, [hi]);
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StatusBar style={"auto"} />

        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="/" component={Login} />
          <Stack.Screen name="KakaoLogin" component={KakaoLogin} />
          <Stack.Screen
            name="Home"
            children={({ navigation, route }) => (
              <Main
                url={url}
                setUrl={setUrl}
                navigation={navigation}
                route={route}
              />
            )}
          />
          <Stack.Screen
            name="Buoy"
            children={({ navigation, route }) => (
              <BuoyInfo
                url={url}
                setUrl={setUrl}
                navigation={navigation}
                route={route}
              />
            )}
          />
          <Stack.Screen
            name="BuoyDetail"
            children={({ navigation, route }) => (
              <BuoyDetail
                url={url}
                setUrl={setUrl}
                navigation={navigation}
                route={route}
              />
            )}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
