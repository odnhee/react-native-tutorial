import { Alert, View } from "react-native";
import React, { useEffect } from "react";
import { globalStyles } from "../config/globalStyles";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

const PreparingOrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
      Alert.alert("주문 알림", "주문이 접수되었습니다!", [{ text: "확인" }]);
    }, 4000);
  }, []);

  return (
    <View
      style={globalStyles.safeArea}
      className="bg-[#00CCBB] flex-1 justify-center items-center"
    >
      <Animatable.Image
        source={require("../assets/orderLoading.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-96"
      />

      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-xl my-10 text-white font-black text-center"
      >
        가게에서 배달 주문을 접수 중이에요!
      </Animatable.Text>

      <Progress.CircleSnail size={60} color="white" thickness={5} />
    </View>
  );
};

export default PreparingOrderScreen;
