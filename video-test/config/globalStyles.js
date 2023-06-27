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
  modalView: {
    marginVertical: 30,
    marginHorizontal: 90,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalExit: {
    position: "absolute",
    right: 20,
    top: 10,
  },
});
