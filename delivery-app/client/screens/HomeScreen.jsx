import { Image, ScrollView, Text, TextInput, View } from "react-native";
import React, { useLayoutEffect } from "react";
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

const HomeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Home",
      // navigation 타이틀
      headerShown: false,
      // navigation 출력 여부
    });
  }, []);

  return (
    <View style={globalStyles.safeArea} className="pt-5">
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
          <FeaturedRow
            id="123"
            title="Featured"
            description="Paid placements from our partners"
            featuredCategory="featured"
          />

          {/* Tasty Discounts */}
          <FeaturedRow
            id="1234"
            title="Tasty Discounts"
            description="Everyone's been enjoying these juicy discounts!"
            featuredCategory="discounts"
          />

          {/* Offers near you */}
          <FeaturedRow
            id="12345"
            title="Offers near you!"
            description="Why not support yout local restaurant tonight!"
            featuredCategory="offers"
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;
