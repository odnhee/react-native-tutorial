import AsyncStorage from "@react-native-async-storage/async-storage";
/**
 * store 함수
 *
 * @param {string} key
 * @param {string[]} value
 */
export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error(e.message);
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      const data = JSON.parse(value);
      return data;
    } else {
      return false;
    }
  } catch (e) {
    console.error(e.message);
  }
};

export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.error(e.message);
  }
  console.log("clear done");
};
