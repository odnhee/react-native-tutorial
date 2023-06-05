import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../features/basketSlice";
import { globalStyles } from "../config/globalStyles";
import { MinusCircleIcon, XCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter";
import "react-native-url-polyfill/auto";

const BasketScreen = () => {
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const totalPrice = useSelector(selectBasketTotal);
  const dispatch = useDispatch();

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  const handleRemove = (key) => {
    dispatch(removeFromBasket({ id: key }));
  };

  return (
    <View style={globalStyles.onlySafeArea} className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
          <View>
            <Text className="text-2xl font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400 text-lg">
              {restaurant.title}
            </Text>
          </View>

          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-5 right-3"
          >
            <XCircleIcon color="#00CCBB" height={50} width={50} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-3 py-3 bg-white my-5">
          <Image
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
            source={{
              uri: "https://links.papareact.com/wru",
            }}
          />

          <Text className="flex-1">Deliver in 50 - 75 Minutes</Text>

          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="w-5">{items.length}</Text>
              <Text className="w-5">✕</Text>

              <Image
                source={{ uri: urlFor(items[0]?.imgUrl).url() }}
                className="h-12 w-12 rounded-full"
              />

              <Text className="flex-1 truncate">{items[0]?.title}</Text>

              <Text className="text-gray-600">
                <Currency
                  quantity={items[0]?.price}
                  currency="KRW"
                  pattern="###,### !"
                />
              </Text>

              <TouchableOpacity onPress={() => handleRemove(key)}>
                <MinusCircleIcon size={30} color="#00CCBB" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">음식 총액</Text>
            <Text className="text-gray-400">
              <Currency
                quantity={totalPrice}
                currency="KRW"
                pattern="###,### !"
              />
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">배달 수수료</Text>
            <Text className="text-gray-400">
              <Currency quantity={5000} currency="KRW" pattern="###,### !" />
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text>주문 총액</Text>
            <Text className="font-extrabold">
              <Currency
                quantity={totalPrice + 5000}
                currency="KRW"
                pattern="###,### !"
              />
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("PreparingOrder")}
            className="rounded-lg bg-[#00CCBB] p-4 mb-5"
          >
            <Text className="text-center text-white text-xl font-black">
              지금 주문하기
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BasketScreen;
