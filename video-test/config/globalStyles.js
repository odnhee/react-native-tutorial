import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
  defaultButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginTop: 20,
  },
  rotateButton: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "blue",
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  rotateView: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
  rotateVideoWrapper: {
    width: "85%",
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  playButton: {
    width: "10%",
    fontSize: 30,
  },
  buttonText: {
    fontSize: 30,
  },
});
