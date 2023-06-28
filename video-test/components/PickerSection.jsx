import { View } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";

const PickerSection = ({ testValue, setTestValue }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Picker
        style={{
          color: "white",
          backgroundColor: "gray",
          width: 300,
        }}
        selectedValue={testValue}
        onValueChange={(itemValue) => setTestValue(itemValue)}
      >
        <Picker.Item label="Test1" value="Test1" />
        <Picker.Item label="Test2" value="Test2" />
        <Picker.Item label="Test3" value="Test3" />
        <Picker.Item label="Test4" value="Test4" />
        <Picker.Item label="Test5" value="Test5" />
        <Picker.Item label="Test6" value="Test6" />
        <Picker.Item label="Test7" value="Test7" />
      </Picker>
    </View>
  );
};

export default PickerSection;
