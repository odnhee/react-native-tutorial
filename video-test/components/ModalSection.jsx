import { View, Text, Modal, Pressable } from "react-native";
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
      <View style={styles.modalView}>
        <Text style={{ paddingBottom: 10 }}>{userProfile?.Nickname}</Text>
        <Text>{userProfile?.Email}</Text>

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
