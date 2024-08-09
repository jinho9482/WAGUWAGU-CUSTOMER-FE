// orderNetwork.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const orderApi = async (url, method, body, params) => {
  const res = await axios({
    url,
    method,
    baseURL: "http://localhost:8080",
    data: body,
    params: params,
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("access_token")}`,
    },
  });

  return res;
};
