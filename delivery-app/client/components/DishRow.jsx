import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter";
import { globalStyles } from "../config/globalStyles";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItemsWithId,
} from "../features/basketSlice";

const DishRow = ({ id, title, shortDescription, price, imgUrl }) => {
  const [isPressed, setIsPressed] = useState(false);
  const dispatch = useDispatch();

  const items = useSelector((state) => {
    return selectBasketItemsWithId(state, id);
  });

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, title, shortDescription, price, imgUrl }));
  };

  const removeItemFromBasket = () => {
    if (!items.length > 0) {
      return null;
    }

    dispatch(removeFromBasket({ id }));
  };

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

          <View className="w-20">
            <Image
              style={{
                borderWidth: 1,
                borderColor: "#F3F3F4",
              }}
              source={{ uri: urlFor(imgUrl).url() }}
              className="h-20 p-4 object-cover"
            />
          </View>
        </View>
      </TouchableOpacity>

      {isPressed && (
        <View
          style={globalStyles.container}
          className="flex-row items-center space-x-2 pb-2"
        >
          <TouchableOpacity
            onPress={removeItemFromBasket}
            disabled={!items.length}
          >
            <MinusCircleIcon
              size={40}
              color={items.length > 0 ? "#00CCBB" : "gray"}
            />
          </TouchableOpacity>

          <Text className="w-6 text-center">{items.length}</Text>

          <TouchableOpacity onPress={addItemToBasket}>
            <PlusCircleIcon
              size={40}
              color={items.length >= 0 ? "#00CCBB" : "gray"}
            />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default DishRow;
