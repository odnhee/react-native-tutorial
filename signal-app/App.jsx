import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import { globalScreenOption } from "./config/globalStyles";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RegisterScreen from "./screens/RegisterScreen";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <StatusBar style="auto" />

      <SafeAreaProvider>
        <Stack.Navigator
          screenOptions={{
            ...globalScreenOption,
          }}
        >
          <Stack.Screen component={LoginScreen} name="Login" />
          <Stack.Screen component={RegisterScreen} name="Register" />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
