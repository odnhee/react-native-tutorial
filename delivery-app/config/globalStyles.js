import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export const globalStyles = StyleSheet.create({
  safeArea: {
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 20,
  },
});
