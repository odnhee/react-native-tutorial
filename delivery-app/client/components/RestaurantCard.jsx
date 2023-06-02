import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { MapPinIcon } from "react-native-heroicons/outline";
import { StarIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";

const RestaurantCard = ({
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
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Restaurant", {
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
        });
      }}
      className="bg-white rounded-md mr-3 shadow w-64"
    >
      <Image
        source={{ uri: urlFor(imgUrl).url() }}
        className="h-36 rounded-t-md object-cover"
      />

      <View className="px-3 pb-2">
        <Text className="font-bold text-lg pt-2">{title}</Text>

        <View className="flex-row items-center space-x-1">
          <StarIcon color="green" opacity={0.5} size={22} />

          <Text className="text-xs text-gray-500">
            <Text className="text-green-500">{rating}</Text> • {genre}
          </Text>
        </View>

        <View className="flex-row items-center space-x-1 truncate">
          <MapPinIcon color="gray" opacity={0.4} size={22} />
          <Text className="text-xs text-gray-500">Nearby • {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
