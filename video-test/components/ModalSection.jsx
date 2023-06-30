import { View, Text, Modal, Pressable, Image } from "react-native";
import React from "react";
import { styles } from "../config/globalStyles";

const ModalSection = ({ modalVisible, setModalVisible, userProfile }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}
    >
      <View style={[styles.modalView, { gap: 10 }]}>
        <Text>{userProfile?.Name}</Text>
        <Text>{userProfile?.Email}</Text>
        <Text>{userProfile?.Phone}</Text>

        <Image
          style={{ width: 40, height: 40 }}
          source={{ uri: userProfile?.Image }}
        />

        <Pressable
          style={styles.modalExit}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Text>✕</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default ModalSection;
