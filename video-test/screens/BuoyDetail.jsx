import { View, Text, Pressable, Dimensions } from "react-native";
import React from "react";
import { useBuoyDetail } from "../api/useBuoyDetail";
import { styles } from "../config/globalStyles";
import LineChartSection from "../components/LineChartSection";

const BuoyDetail = ({ route }) => {
  const { id } = route.params;

  const { status, data, error, isFetching } = useBuoyDetail(id);

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
    <>
      <View style={styles.buoyContainer}>
        <View style={{ paddingVertical: 10, flexDirection: "column", gap: 10 }}>
          <Text
            style={{ paddingVertical: 10, fontWeight: "bold", fontSize: 20 }}
          >
            {data?.serial_number}
            {data?.device_id}
          </Text>
          <Text>Device Type : {data?.device_type}</Text>

          <Text>Battery : {data?.battery}%</Text>

          <Text>Owner : {data?.owner}</Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>Operating State </Text>
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 10 / 2,
                backgroundColor:
                  data?.operating_state === true ? "green" : "red",
                marginLeft: 5,
              }}
            />
          </View>
        </View>
      </View>

      <LineChartSection id={id} />
    </>
  );
};

export default BuoyDetail;
