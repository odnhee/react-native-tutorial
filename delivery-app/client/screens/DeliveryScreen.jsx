import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Linking,
  Platform,
} from "react-native";
import React from "react";
import { globalStyles } from "../config/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import { PhoneIcon, XMarkIcon } from "react-native-heroicons/solid";
import * as Progress from "react-native-progress";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);

  const handleCall = () => {
    if (Platform.OS === "android") {
      Linking.openURL("tel://010-2067-4413");
    } else if (Platform.OS === "ios") {
      Linking.openURL("tel://010-2067-4413");
      // ios는 실제 핸드폰으로 테스트 하지 않는 이상 전화 불가능
    }
  };

  return (
    <View style={globalStyles.onlySafeArea} className="bg-[#00CCBB] flex-1">
      <View className="mt-2 flex-row justify-between items-center p-5">
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <XMarkIcon color="white" size={30} />
        </TouchableOpacity>

        <Text className="font-light text-white text-lg">Order Help</Text>
      </View>
      <View className="bg-white mx-5 rounded-xl p-6 z-50 shadow-md">
        <View className="flex-row justify-between space-x-1">
          <View className="z-10">
            <Text className="text-lg text-gray-400">도착 예정 시간</Text>
            <Text className="text-4xl font-bold">45 - 50 Minutes</Text>
          </View>

          <Image
            source={require("../assets/deliveryScooter.gif")}
            className="w-20 h-20 -rotate-[12deg]"
          />
        </View>
        <Progress.Bar size={30} color="#00CCBB" indeterminate={true} />

        <Text className="mt-3 text-gray-500">
          <Text className="font-bold text-lg text-[#00CCBB]">
            {restaurant.title}
          </Text>
          에서 주문받은 음식을 준비 중입니다!
        </Text>

        {/* <Text className="mt-3 text-gray-500">
          현재 지도는 테스트용 이미지입니다.
        </Text> */}
      </View>

      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        mapType="mutedStandard"
        className="flex-1 -mt-10 z-0 w-[100%] h-[100%]"
        provider={PROVIDER_GOOGLE}
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.title}
          description={restaurant.shortDescription}
          identifier="origin"
          pinColor="#00CCBB"
        />
      </MapView>

      {/* <Image
        source={require("../assets/mapExample.png")}
        className="flex-1 -mt-10 z-0 w-[100%] h-[100%]"
      /> */}

      <SafeAreaView className="bg-white flex-row items-center space-x-5 h-28">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-12 w-12 bg-gray-300 p-4 rounded-full ml-5"
        />

        <View className="flex-1">
          <Text className="text-lg font-bold text-[#00CCBB]">
            {restaurant.title}
            <Text className="text-black"> 라이더</Text>
          </Text>
          <Text className="text-gray-400">배차 완료</Text>
        </View>

        <TouchableOpacity className="mr-5" onPress={handleCall}>
          <PhoneIcon size={30} color="#00CCBB" />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;
