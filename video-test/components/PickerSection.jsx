import { View } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";

const PickerSection = ({ testValue, setTestValue, rotate }) => {
  const [focusColor, setFocusColor] = useState("gray");

  console.log(testValue);

  return (
    <View style={{ alignItems: "center", paddingBottom: 10 }}>
      <View
        style={{
          borderRadius: 10,
          borderWidth: 2,
          borderColor:
            testValue === "" || undefined ? "focusColor" : focusColor,
          display: rotate ? "none" : "flex",
          width: 280,
          height: 45,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Picker
          style={{
            color: "black",
            backgroundColor: "transparent",
            width: "95%",
          }}
          // onFocus={() => setFocusColor("#0063aa")}
          // onBlur={() => setFocusColor("gray")}
          selectedValue={testValue}
          onValueChange={(itemValue) => setTestValue(itemValue)}
          itemStyle={{ color: "gray" }}
          dropdownIconColor={focusColor}
        >
          <Picker.Item label="회원 타입 입력" value="" />
          <Picker.Item label="Test1" value="Test1" />
          <Picker.Item label="Test2" value="Test2" />
          <Picker.Item label="Test3" value="Test3" />
          <Picker.Item label="Test4" value="Test4" />
          <Picker.Item label="Test5" value="Test5" />
          <Picker.Item label="Test6" value="Test6" />
          <Picker.Item label="Test7" value="Test7" />
        </Picker>
      </View>
    </View>
  );
};

export default PickerSection;
