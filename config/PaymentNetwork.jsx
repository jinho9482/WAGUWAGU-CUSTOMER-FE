import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const paymentApi = async (url, method, body, params) => {
  const res = await axios({
    url,
    method,
    baseURL: "http://34.68.136.4", // 변경 필요
    data: body,
    params: params,
    // headers: {
    //   Authorization: `Bearer ${await AsyncStorage.getItem("access_token")}`,
    // },
  });

  return res;
};
