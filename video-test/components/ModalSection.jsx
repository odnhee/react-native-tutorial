import { View, Text, Modal, Pressable, Image, ScrollView } from "react-native";
import React from "react";
import { styles } from "../config/globalStyles";

const ModalSection = ({ modalVisible, setModalVisible, userProfile }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}
    >
      <ScrollView style={styles.modalView}>
        <Pressable
          style={styles.modalExit}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Text style={{ fontSize: 60, fontWeight: "bold", color: "#cfcfcf" }}>
            ㅡ
          </Text>
        </Pressable>

        <View
          style={{
            alignItems: "center",
            borderTopWidth: 1,
            borderColor: "#dbdbdb",
            height: 70,
            justifyContent: "center",
          }}
        >
          <Text>{userProfile?.Name}</Text>
        </View>

        <View
          style={{
            alignItems: "center",
            borderTopWidth: 1,
            borderColor: "#dbdbdb",
            height: 70,
            justifyContent: "center",
          }}
        >
          <Text>{userProfile?.Email}</Text>
        </View>

        <View
          style={{
            alignItems: "center",
            borderTopWidth: 1,
            borderColor: "#dbdbdb",
            height: 70,
            justifyContent: "center",
          }}
        >
          <Text>{userProfile?.Phone}</Text>
        </View>

        <View
          style={{
            alignItems: "center",
            borderTopWidth: 1,
            borderColor: "#dbdbdb",
            height: 70,
            justifyContent: "center",
          }}
        >
          <Text>{userProfile?.Name}</Text>
        </View>

        <View
          style={{
            alignItems: "center",
            borderTopWidth: 1,
            borderColor: "#dbdbdb",
            height: 70,
            justifyContent: "center",
          }}
        >
          <Text>{userProfile?.Email}</Text>
        </View>

        <View
          style={{
            alignItems: "center",
            borderTopWidth: 1,
            borderColor: "#dbdbdb",
            height: 70,
            justifyContent: "center",
          }}
        >
          <Text>{userProfile?.Phone}</Text>
        </View>

        <View
          style={{
            alignItems: "center",
            borderTopWidth: 1,
            borderColor: "#dbdbdb",
            height: 70,
            justifyContent: "center",
          }}
        >
          <Text>{userProfile?.Name}</Text>
        </View>

        <View
          style={{
            alignItems: "center",
            borderTopWidth: 1,
            borderColor: "#dbdbdb",
            height: 70,
            justifyContent: "center",
          }}
        >
          <Text>{userProfile?.Email}</Text>
        </View>

        <View
          style={{
            alignItems: "center",
            borderTopWidth: 1,
            borderColor: "#dbdbdb",
            height: 70,
            justifyContent: "center",
          }}
        >
          <Text>{userProfile?.Phone}</Text>
        </View>

        <View
          style={{
            alignItems: "center",
            borderTopWidth: 1,
            borderColor: "#dbdbdb",
            height: 70,
            justifyContent: "center",
          }}
        >
          <Image
            style={{ width: 40, height: 40 }}
            source={{ uri: userProfile?.Image }}
          />
        </View>
      </ScrollView>
    </Modal>
  );
};

export default ModalSection;
