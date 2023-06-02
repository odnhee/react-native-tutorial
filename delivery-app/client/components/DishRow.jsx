import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter";
import { globalStyles } from "../config/globalStyles";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";

const DishRow = ({ id, title, shortDescription, price, imgUrl }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        style={globalStyles.container}
        className={`border border-gray-200 py-4 ${isPressed && "border-b-0"}`}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="text-lg mb-1">{title}</Text>
            <Text className="text-gray-400">{shortDescription}</Text>
            <Text className="text-gray-400 mt-2">
              <Currency quantity={price} currency="KRW" pattern="###,### !" />
            </Text>
          </View>

          <View>
            <Image
              style={{
                borderWidth: 1,
                borderColor: "#F3F3F4",
              }}
              source={{ uri: urlFor(imgUrl).url() }}
              className="w-20 h-20 bg-fray-300 p-4"
            />
          </View>
        </View>
      </TouchableOpacity>

      {isPressed && (
        <View
          style={globalStyles.container}
          className="flex-row items-center space-x-2 pb-2"
        >
          <TouchableOpacity>
            <MinusCircleIcon
              size={40}
              color="#00CCBB"
              // color={items.length > 0 ? "#00CCBB" : "gray"}
            />
          </TouchableOpacity>

          <Text>0</Text>

          <TouchableOpacity>
            <PlusCircleIcon
              size={40}
              color="#00CCBB"
              // color={items.length > 0 ? "#00CCBB" : "gray"}
            />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default DishRow;
