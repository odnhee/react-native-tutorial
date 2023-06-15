import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
  button: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  rotateButton: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "blue",
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
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
});
