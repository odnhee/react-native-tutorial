import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export const globalStyles = StyleSheet.create({
  safeArea: {
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 20,
    height: "100%",
  },
  onlySafeArea: {
    paddingTop: Constants.statusBarHeight,
    height: "100%",
  },
  container: {
    paddingHorizontal: 20,
  },
});
