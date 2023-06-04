import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import { useNavigation } from "@react-navigation/native";
import Currency from "react-currency-formatter";

const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotal);

  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity
        onPress={() => navigation.navigate("Basket")}
        className="bg-[#00CCBB] mx-5 p-4 rounded-xl flex-row items-center space-x-1"
      >
        <View className="bg-[#01A296] py-1 px-2 rounded-full w-12 h-12 items-center justify-center">
          <Text className="text-white font-extrabold text-lg text-center">
            {items.length}
          </Text>
        </View>
        <Text className="flex-1 text-white font-extrabold text-lg text-center">
          View Basket
        </Text>

        <Text className="text-lg text-white font-extrabold">
          <Currency quantity={basketTotal} currency="KRW" pattern="###,### !" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
