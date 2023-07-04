import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
  buoyContainer: {
    paddingTop: Constants.statusBarHeight + 20,
    marginHorizontal: 20,
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
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "50%",
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    overflow: "hidden",
  },
  modalExit: {
    marginTop: -36,
    alignItems: "center",
  },
});

export const chartConfig = {
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  barPercentage: 0.5,
  useShadowColorFromDataset: true, // optional
  backgroundColor: "#f0f0f0",
  backgroundGradientFrom: "#f0f0f0",
  backgroundGradientTo: "#f0f0f0",
  decimalPlaces: 2, // optional, defaults to 2dp
  propsForDots: {
    r: "4",
    // stroke: "#ffa726",
  },
};
