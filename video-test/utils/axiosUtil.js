import axios from "axios";

const heroClient = axios.create({ baseURL: "http://localhost:5000" });
const buoyClient = axios.create({ baseURL: "https://api.odn-it.com/devices" });
const videoClient = axios.create({
  baseURL:
    "https://aws-cli-deploy-test-hhj.s3.ap-northeast-2.amazonaws.com/VideoLink.rtf",
});

export const heroRequest = async ({ ...options }) => {
  heroClient.defaults.headers.common.Authorization = "Bearer CLIENT_TOKEN";
  heroClient.defaults.withCredentials = true;
  const onSuccess = (res) => res;
  const onError = (error) => {
    return error;
  };

  try {
    const res = await heroClient(options);
    return onSuccess(res);
  } catch (error) {
    return onError(error);
  }
};

export const buoyRequest = async ({ ...options }) => {
  buoyClient.defaults.headers.common.Authorization = "Bearer BUOY_TOKEN";
  const onSuccess = (res) => res;
  const onError = (error) => {
    return error;
  };

  try {
    const res = await buoyClient(options);
    return onSuccess(res);
  } catch (error) {
    return onError(error);
  }
};

export const videoRequest = async ({ ...options }) => {
  videoClient.defaults.headers.common.Authorization = "Bearer VIDEO_TOKEN";
  const onSuccess = (res) => res;
  const onError = (error) => {
    return error;
  };

  try {
    const res = await videoClient(options);
    return onSuccess(res);
  } catch (error) {
    return onError(error);
  }
};
