import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import HomeScreen from "./screens/HomeScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
// import { Provider } from "react-redux";
// import { store } from "./store";
// https://www.youtube.com/watch?v=AkEnidfZnCU
// https://heroicons.com/
// https://redux-toolkit.js.org/tutorials/quick-start
// https://www.siksinhot.com/search?keywords=%EB%82%B4%20%EC%A3%BC%EB%B3%80

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <Provider store={store}> */}
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Restaurant" component={RestaurantScreen} />
      </Stack.Navigator>
      {/* </Provider> */}

      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
