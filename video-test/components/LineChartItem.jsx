import { View, Text } from "react-native";
import React from "react";
import { LineChart } from "react-native-chart-kit";
import { chartConfig, styles } from "../config/globalStyles";

const LineChartItem = ({
  status,
  data,
  error,
  isFetching,
  chartData,
  screenWidth,
  showMessage,
}) => {
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
      {data?.map((res) => res?.temperature).length < 10 ||
      data === undefined ? (
        <View style={{ alignItems: "center" }}>
          <Text>수집된 데이터가 존재하지 않습니다.</Text>
        </View>
      ) : (
        <LineChart
          onDataPointClick={({ value, getColor }) =>
            showMessage({
              message: "수온",
              description: `${parseFloat(value).toFixed(2)} ℃`,
              backgroundColor: getColor(0.8),
            })
          }
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
    </>
  );
};

export default LineChartItem;
