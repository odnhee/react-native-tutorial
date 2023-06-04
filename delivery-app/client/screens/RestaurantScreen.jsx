import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/outline";
import { StarIcon } from "react-native-heroicons/solid";
import { globalStyles } from "../config/globalStyles";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { selectBasketItems } from "../features/basketSlice";
import { useDispatch, useSelector } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const items = useSelector(selectBasketItems);
  const dispatch = useDispatch();

  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      shortDescription,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        shortDescription,
        dishes,
        long,
        lat,
      })
    );
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <>
      {items.length > 0 ? <BasketIcon /> : null}

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="bg-white relative">
          <View>
            <Image
              source={{ uri: urlFor(imgUrl).url() }}
              className="w-full h-56 bg-gray-300 p-4"
            />

            {Platform.OS === "ios" ? (
              <TouchableOpacity
                onPress={navigation.goBack}
                className="absolute top-14 left-5 bg-white rounded-full w-8 h-8 items-center justify-center"
              >
                <ArrowLeftIcon size={20} color={"#00CCBB"} />
              </TouchableOpacity>
            ) : null}
          </View>

          <View style={globalStyles.container}>
            <View className="pt-4">
              <Text className="text-3xl font-bold py-2">{title}</Text>

              <View className="flex-row space-x-2 my-1">
                <View className="flex-row items-center space-x-1">
                  <StarIcon color="green" opacity={0.5} size={22} />
                  <Text className="text-xs text-gray-500">
                    <Text className="text-green-500">{rating}</Text> • {genre}
                  </Text>
                </View>

                <View className="flex-row items-center space-x-1">
                  <MapPinIcon color="gray" opacity={0.4} size={22} />
                  <Text className="text-xs text-gray-500">
                    Nearby • {address}
                  </Text>
                </View>
              </View>

              <Text className="text-gray-500 mt-2 pb-4">
                {shortDescription}
              </Text>
            </View>
          </View>

          <TouchableOpacity className="flex-row items-center space-x-2 px-5 py-3 border-y border-gray-300">
            <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} />

            <Text className="pl-1 flex-1 text-md font-bold text-gray-500">
              Have a food allergy?
            </Text>

            <ChevronRightIcon color={"#00CCBB"} />
          </TouchableOpacity>
        </View>

        <View className={items.length > 0 ? "pb-36" : "pb-0"}>
          <View style={globalStyles.container}>
            <Text className="my-4 font-bold text-xl">Menu</Text>
          </View>

          <View className="bg-white">
            {/* Dishes */}
            {dishes.map((dish) => (
              <DishRow
                key={dish._id}
                id={dish._id}
                title={dish.name}
                shortDescription={dish.short_description}
                price={dish.price}
                imgUrl={dish.image}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
