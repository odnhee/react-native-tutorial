import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { globalStyles } from "../config/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import { XMarkIcon } from "react-native-heroicons/solid";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);

  return (
    <View style={globalStyles.onlySafeArea} className="bg-[#00CCBB] flex-1">
      <View className="mt-2">
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <XMarkIcon color="white" size={30} />
        </TouchableOpacity>
        <Text>Order Help</Text>
      </View>
    </View>
  );
};

export default DeliveryScreen;
