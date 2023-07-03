import { View, Dimensions, ScrollView } from "react-native";
import React from "react";
import {
  useBuoyConducts,
  useBuoyOxygen,
  useBuoyPh,
} from "../api/useBuoyOxygen";
import FlashMessage, { showMessage } from "react-native-flash-message";
import LineChartItem from "./LineChartItem";

const screenWidth = Dimensions.get("window").width;

const LineChartSection = ({ id }) => {
  const { status, data, error, isFetching } = useBuoyOxygen(id);
  const {
    status: phStatus,
    data: phsData,
    error: phError,
    isFetching: phIsFetching,
  } = useBuoyPh(id);
  const {
    status: conductsStatus,
    data: conductsData,
    error: conductsError,
    isFetching: conductsIsFetching,
  } = useBuoyConducts(id);

  const temperatureData = {
    // labels: data?.map((res) => [new Date(res?.measured_time).toUTCString()]),
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
    // labels: data?.map((res) => [new Date(res?.measured_time).toUTCString()]),
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
    // labels: phsData?.map((res) => [new Date(res?.measured_time).toUTCString()]),
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

  const conductData = {
    // labels: phsData?.map((res) => [new Date(res?.measured_time).toUTCString()]),
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [
      {
        data: conductsData?.map((res) => [res?.salinity]),
        color: (opacity = 1) => `rgba(54, 103, 236, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["염도 (mV)"], // optional
  };

  return (
    <>
      <FlashMessage
        duration={2000}
        position="bottom"
        style={{ borderRadius: 15, marginVertical: 15, marginHorizontal: 20 }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ gap: 20, alignItems: "center", paddingVertical: 20 }}>
          <LineChartItem
            status={status}
            data={data}
            error={error}
            isFetching={isFetching}
            chartData={temperatureData}
            screenWidth={screenWidth}
            showMessage={showMessage}
          />
          <LineChartItem
            status={status}
            data={data}
            error={error}
            isFetching={isFetching}
            chartData={mplData}
            screenWidth={screenWidth}
            showMessage={showMessage}
          />
          <LineChartItem
            status={phStatus}
            data={phsData}
            error={phError}
            isFetching={phIsFetching}
            chartData={phData}
            screenWidth={screenWidth}
            showMessage={showMessage}
          />
          <LineChartItem
            status={conductsStatus}
            data={conductsData}
            error={conductsError}
            isFetching={conductsIsFetching}
            chartData={conductData}
            screenWidth={screenWidth}
            showMessage={showMessage}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default LineChartSection;
