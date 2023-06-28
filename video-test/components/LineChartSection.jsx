import { View, Text, Dimensions } from "react-native";
import React from "react";
import { LineChart } from "react-native-chart-kit";
import { useBuoyOxygen } from "../hooks/useBuoyOxygen";
import { styles } from "../config/globalStyles";

const chartConfig = {
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
  backgroundColor: "#f0f0f0",
  backgroundGradientFrom: "#f0f0f0",
  backgroundGradientTo: "#f0f0f0",
};

const screenWidth = Dimensions.get("window").width;

const LineChartSection = ({ id }) => {
  const { status, data, error, isFetching } = useBuoyOxygen(id);

  const chartData = {
    // labels: data?.map((res) => [res?.measured_time]),
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [
      {
        data: data?.map((res) => [res?.temperature]),
        color: (opacity = 1) => `rgba(50, 50, 50, ${opacity})`, // optional
        strokeWidth: 5, // optional
      },
    ],
    legend: ["Oxygen Temperature"], // optional
  };

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
    <View
      style={{
        alignItems: "center",
      }}
    >
      {data[0] === undefined || data.length < 10 ? (
        <Text>데이터가 없습니다.</Text>
      ) : (
        <LineChart
          data={chartData}
          width={screenWidth - 30}
          height={220}
          chartConfig={chartConfig}
          style={{
            borderRadius: 15,
            shadowOffset: {
              width: 10,
              height: 10,
            },
            shadowOpacity: 0.5,
            shadowRadius: 15,
            elevation: 5,
          }}
          bezier
        />
      )}
    </View>
  );
};

export default LineChartSection;
