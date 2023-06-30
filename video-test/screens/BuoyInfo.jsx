import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import { styles } from "../config/globalStyles";
import { useBuoy } from "../api/useBuoy";

const BuoyInfo = ({ route, navigation, setUrl }) => {
  const { status, data, error, isFetching } = useBuoy();

  // useEffect(() => {
  //   setUrl(route.name);
  // }, []);

  if (isFetching) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  /** 아래 코드로 에러 핸들링 끝 */
  if (status === "error") {
    // status -> success, loading, error...
    return (
      <View style={styles.container}>
        <Text>Error : {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.buoyContainer}>
      <Text style={{ paddingVertical: 10, fontWeight: "bold", fontSize: 20 }}>
        Click To Buoy Detail
      </Text>
      {data?.map((allData) => {
        return (
          <Pressable
            key={allData.device_id}
            style={{ paddingVertical: 10, flexDirection: "row" }}
            onPress={() => {
              navigation.navigate("BuoyDetail", {
                id: allData.device_id,
              });
            }}
          >
            <Text>Device ID : </Text>
            <Text>
              {allData.serial_number}
              {allData.device_id}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default BuoyInfo;
