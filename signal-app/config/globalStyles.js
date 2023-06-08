import Constants from "expo-constants";
import { styled } from "styled-components/native";

export const SafeArea = styled.View`
  padding-top: ${Constants.statusBarHeight + 5}px;
  height: 100%;
`;

export const Container = styled.View`
  padding-left: 20px;
  padding-right: 20px;
`;

export const globalScreenOption = {
  headerStyle: { backgroundColor: "#2C6BED" },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white",
};
