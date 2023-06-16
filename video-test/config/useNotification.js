import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export async function sendPushNotification(expoPushToken, title, body) {
  await Notifications.scheduleNotificationAsync({
    content: {
      to: expoPushToken,
      title: title,
      body: body,
      data: { data: "goes here" },
    },
    trigger: null,
  });
}

export async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "5194adf8-7c91-4ca2-815e-1405ebe8e31a",
      })
    ).data;
  } else {
    console.log("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
