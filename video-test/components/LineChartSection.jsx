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
    labels: data?.map((res) => {
      const hour = String(new Date(res?.measured_time).getHours()).padStart(
        2,
        "0"
      );
      const minute = String(new Date(res?.measured_time).getMinutes()).padStart(
        2,
        "0"
      );

      const labelData = [hour + ":" + minute];

      return labelData;
    }),
    datasets: [
      {
        data: data?.map((res) => [res?.temperature]),
        color: (opacity = 1) => `rgba(54, 103, 236, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["수온 (℃)"], // optional
  };

  const temperatureMessage = ({ value, getColor }) =>
    showMessage({
      message: "수온",
      description: `${parseFloat(value).toFixed(2)} ℃`,
      backgroundColor: getColor(0.8),
    });

  const mplData = {
    labels: data?.map((res) => {
      const hour = String(new Date(res?.measured_time).getHours()).padStart(
        2,
        "0"
      );
      const minute = String(new Date(res?.measured_time).getMinutes()).padStart(
        2,
        "0"
      );

      const labelData = [hour + ":" + minute];

      return labelData;
    }),
    datasets: [
      {
        data: data?.map((res) => [res?.oxygen_mpl]),
        color: (opacity = 1) => `rgba(54, 103, 236, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["용존 산소 (mg/l)"], // optional
  };

  const mplMessage = ({ value, getColor }) =>
    showMessage({
      message: "용존 산소",
      description: `${parseFloat(value).toFixed(2)} mg/l`,
      backgroundColor: getColor(0.8),
    });

  const phData = {
    labels: phsData?.map((res) => {
      const hour = String(new Date(res?.measured_time).getHours()).padStart(
        2,
        "0"
      );
      const minute = String(new Date(res?.measured_time).getMinutes()).padStart(
        2,
        "0"
      );

      const labelData = [hour + ":" + minute];

      return labelData;
    }),
    datasets: [
      {
        data: phsData?.map((res) => [res?.ph]),
        color: (opacity = 1) => `rgba(54, 103, 236, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["수소 이온 농도 (ph)"], // optional
  };

  const phMessage = ({ value, getColor }) =>
    showMessage({
      message: "수소 이온 농도",
      description: `${parseFloat(value).toFixed(2)} ph`,
      backgroundColor: getColor(0.8),
    });

  const conductData = {
    labels: phsData?.map((res) => {
      const hour = String(new Date(res?.measured_time).getHours()).padStart(
        2,
        "0"
      );
      const minute = String(new Date(res?.measured_time).getMinutes()).padStart(
        2,
        "0"
      );

      const labelData = [hour + ":" + minute];

      return labelData;
    }),
    datasets: [
      {
        data: conductsData?.map((res) => [res?.salinity]),
        color: (opacity = 1) => `rgba(54, 103, 236, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["염도 (mV)"], // optional
  };

  const conductMessage = ({ value, getColor }) =>
    showMessage({
      message: "염도",
      description: `${parseFloat(value).toFixed(2)} mV`,
      backgroundColor: getColor(0.8),
    });

  return (
    <>
      <FlashMessage
        duration={2000}
        position="bottom"
        style={{ borderRadius: 15, marginVertical: 15, marginHorizontal: 20 }}
        // autoHide={false}
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
            showMessage={temperatureMessage}
          />
          <LineChartItem
            status={status}
            data={data}
            error={error}
            isFetching={isFetching}
            chartData={mplData}
            screenWidth={screenWidth}
            showMessage={mplMessage}
          />
          <LineChartItem
            status={phStatus}
            data={phsData}
            error={phError}
            isFetching={phIsFetching}
            chartData={phData}
            screenWidth={screenWidth}
            showMessage={phMessage}
          />
          <LineChartItem
            status={conductsStatus}
            data={conductsData}
            error={conductsError}
            isFetching={conductsIsFetching}
            chartData={conductData}
            screenWidth={screenWidth}
            showMessage={conductMessage}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default LineChartSection;
