// orderNetwork.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const orderApi = async (url, method, body, params) => {
  const res = await axios({
    url,
    method,
    // baseURL: "http://192.168.0.20:8080", // baseURL
    baseURL: "https://waguwagu.shop",
    data: body,
    params: params,
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("access_token")}`,
    },
  });

  return res;
};
