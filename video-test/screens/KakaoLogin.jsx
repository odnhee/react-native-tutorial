import React from "react";
import WebView from "react-native-webview";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";

const REST_API_KEY = "27578bf277bc26e06658c9dc8ce3fc2d";
const REDIRECT_URI =
  "https://aws-cli-deploy-test-hhj.s3.ap-northeast-2.amazonaws.com/splash.html";
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

const KakaoLogin = ({ navigation }) => {
  function KakaoLoginWebView(data) {
    const exp = "code=";
    const error_description = "error_description=";

    var condition = data.indexOf(exp);
    var errorCheck = data.indexOf(error_description);

    if (condition != -1) {
      var authorize_code = data.substring(condition + exp.length);
      console.log(`authorize_code : ${authorize_code}`);
      requestToken(authorize_code);
      navigation.navigate("Home");
    } else if (errorCheck != -1) {
      var error_code = data.substring(errorCheck + error_description.length);
      console.log(error_code);
      navigation.navigate("/");
    }
  }

  const requestToken = async (authorize_code) => {
    var accessToken = "none";
    axios({
      method: "post",
      url: "https://kauth.kakao.com/oauth/token",
      params: {
        grant_type: "authorization_code",
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code: authorize_code,
      },
    })
      .then((res) => {
        accessToken = res.data.access_token;
        storeToken(accessToken);
      })
      .catch((error) => {
        console.log(`Error : ${error}`);
      });
  };

  const storeToken = async (accessToken) => {
    try {
      await AsyncStorage.setItem("userAccessToken", accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={["*"]}
        scalesPageToFit={true}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={(event) => {
          KakaoLoginWebView(event.nativeEvent["url"]);
        }}
      />
    </View>
  );
};

export default KakaoLogin;
