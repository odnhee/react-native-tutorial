import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import KakaoLogin from "./screens/KakaoLogin";
import Main from "./screens/Main";
import BuoyInfo from "./screens/BuoyInfo";
import BuoyDetail from "./screens/BuoyDetail";
import { backAction, backgroundAction } from "./utils/appStateManager";
import { useEffect } from "react";

import { BackHandler } from "react-native";
const Stack = createNativeStackNavigator();
export default () => {
  useEffect(() => {
    if (url === "Home") {
      console.log("hihi");
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="/" component={Login} />
            <Stack.Screen name="KakaoLogin" component={KakaoLogin} /> */}
        <Stack.Screen name="Home" component={Main} />
        <Stack.Screen name="Buoy" component={BuoyInfo} />
        <Stack.Screen name="BuoyDetail" component={BuoyDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
