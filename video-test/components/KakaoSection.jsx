import { View, Text, Pressable } from "react-native";
import React from "react";

const KakaoSection = ({ getInfo, logout, unlink, setModalVisible, rotate }) => {
  return (
    <View
      style={{
        alignItems: "center",
        marginTop: 30,
        display: rotate ? "none" : "flex",
      }}
    >
      <Pressable
        onPress={() => {
          getInfo();
          setModalVisible(true);
        }}
        style={{ paddingBottom: 10 }}
      >
        <Text style={{ fontSize: 20 }}>Kakao Profile</Text>
      </Pressable>

      <Pressable onPress={logout} style={{ paddingBottom: 10 }}>
        <Text style={{ fontSize: 20 }}>Kakao Logout</Text>
      </Pressable>

      <Pressable onPress={unlink} style={{ paddingBottom: 10 }}>
        <Text style={{ fontSize: 20 }}>Kakao Unlink</Text>
      </Pressable>
    </View>
  );
};

export default KakaoSection;
