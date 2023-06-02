import { Image, ScrollView, Text, TextInput, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../config/globalStyles";
import {
  AdjustmentsVerticalIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";
import "react-native-url-polyfill/auto";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Home",
      // navigation 타이틀
      headerShown: false,
      // navigation 출력 여부
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `
      *[_type == "featured"] {
        ...,
        restaurants[] -> {
          ...,
          dishes[] ->
        }
      }
    `
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);

  return (
    <View style={globalStyles.safeArea} className="pt-5 pb-10">
      {/* Header */}
      <View>
        <View className="flex-row pb-3 items-center space-x-2">
          <Image
            source={{
              uri: "https://links.papareact.com/wru",
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />

          <View className="flex-1">
            <Text className="font-bold text-gray-400 text-xs">
              Deliver Now!
            </Text>
            <Text className="font-bold text-xl">
              Current Location&nbsp;
              <ChevronDownIcon size={20} color={"#00CCBB"} />
            </Text>
          </View>

          <UserIcon size={35} color={"#00CCBB"} />
        </View>

        {/* Search */}
        <View className="flex-row items-center space-x-2 pb-2">
          <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3 rounded-full">
            <MagnifyingGlassIcon color={"gray"} />
            <TextInput
              placeholder="Restaurants and cuisines"
              keyboardType="default"
            />
          </View>

          <AdjustmentsVerticalIcon color={"#00CCBB"} />
        </View>

        {/* Body */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 100,
          }}
        >
          {/* Categories */}
          <Categories />

          {/* Featured */}
          {featuredCategories?.map((cat) => (
            <FeaturedRow
              key={cat._id}
              id={cat._id}
              title={cat.name}
              description={cat.short_description}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;
