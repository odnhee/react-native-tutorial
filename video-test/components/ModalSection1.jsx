import { View, Text, Modal, Pressable, Image, ScrollView } from "react-native";
import React from "react";
import { styles } from "../config/globalStyles";
import { Modalize } from "react-native-modalize";

const ModalSection = ({ modalVisible, setModalVisible, userProfile }) => {
  return (
    <Modalize
      scrollViewProps={{ showsVerticalScrollIndicator: false }}
      snapPoint={300}
      HeaderComponent={
        <View>
          <Text>Header</Text>
        </View>
      }
      withHandle={false}
    >
      ...your content
    </Modalize>
  );
};

export default ModalSection;
