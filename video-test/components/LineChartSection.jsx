import { View, Text, Dimensions, ScrollView } from "react-native";
import React from "react";
import { LineChart } from "react-native-chart-kit";
import { useBuoyOxygen, useBuoyPh } from "../api/useBuoyOxygen";
import { styles } from "../config/globalStyles";
import FlashMessage, { showMessage } from "react-native-flash-message";

const chartConfig = {
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  barPercentage: 0.5,
  useShadowColorFromDataset: true, // optional
  backgroundColor: "#f0f0f0",
  backgroundGradientFrom: "#f0f0f0",
  backgroundGradientTo: "#f0f0f0",
  decimalPlaces: 1, // optional, defaults to 2dp
  propsForDots: {
    r: "4",
    // stroke: "#ffa726",
  },
};

const screenWidth = Dimensions.get("window").width;

const LineChartSection = ({ id }) => {
  const { status, data, error, isFetching } = useBuoyOxygen(id);
  const {
    status: phStatus,
    data: phsData,
    error: phError,
    isFetching: phIsFetching,
  } = useBuoyPh(id);

  const temperatureData = {
    // labels: data?.map((res) => [res?.measured_time]),
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [
      {
        data: data?.map((res) => [res?.temperature]),
        color: (opacity = 1) => `rgba(54, 103, 236, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["수온 (℃)"], // optional
  };

  const mplData = {
    // labels: data?.map((res) => [res?.measured_time]),
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [
      {
        data: data?.map((res) => [res?.oxygen_mpl]),
        color: (opacity = 1) => `rgba(54, 103, 236, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["용존 산소 (mg/l)"], // optional
  };

  const phData = {
    // labels: data?.map((res) => [res?.measured_time]),
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [
      {
        data: phsData?.map((res) => [res?.ph]),
        color: (opacity = 1) => `rgba(54, 103, 236, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["수소 이온 농도 (ph)"], // optional
  };

  if (phIsFetching) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  /** 아래 코드로 에러 핸들링 끝 */
  if (phStatus === "error") {
    // status -> success, loading, error...
    return (
      <View style={styles.container}>
        <Text>Error : {phError.message}</Text>
      </View>
    );
  }

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
      <FlashMessage duration={2000} position="bottom" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {data[0] === undefined || data.length < 10 ? (
          <View style={{ alignItems: "center" }}>
            <Text>수집된 데이터가 존재하지 않습니다.</Text>
          </View>
        ) : (
          <View style={{ gap: 20, alignItems: "center", paddingVertical: 20 }}>
            <LineChart
              onDataPointClick={({ value, getColor }) =>
                showMessage({
                  message: "수온",
                  description: `${parseFloat(value).toFixed(2)} ℃`,
                  backgroundColor: getColor(0.7),
                })
              }
              data={temperatureData}
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

            <LineChart
              onDataPointClick={({ value, getColor }) =>
                showMessage({
                  message: "용존 산소",
                  description: `${parseFloat(value).toFixed(2)} mg/l`,
                  backgroundColor: getColor(0.7),
                })
              }
              data={mplData}
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

            <LineChart
              onDataPointClick={({ value, getColor }) =>
                showMessage({
                  message: "수소 이온 농도",
                  description: `${parseFloat(value).toFixed(2)} ph`,
                  backgroundColor: getColor(0.7),
                })
              }
              data={phData}
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
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default LineChartSection;
