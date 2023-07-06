import Main from "./screens/Main";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import { StatusBar } from "expo-status-bar";
import KakaoLogin from "./screens/KakaoLogin";
import BuoyInfo from "./screens/BuoyInfo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BuoyDetail from "./screens/BuoyDetail";
import { RecoilRoot } from "recoil";
import Splash from "./screens/Splash";

const Stack = createNativeStackNavigator();

function App() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    console.log(url);
  }, [url]);

  const queryClient = new QueryClient();

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <StatusBar style={"auto"} />

          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="/" component={Login} />
            <Stack.Screen name="KakaoLogin" component={KakaoLogin} />
            <Stack.Screen
              name="Splash"
              children={({ navigation, route }) => (
                <Splash navigation={navigation} route={route} />
              )}
            />
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
    </RecoilRoot>
  );
}

export default App;
