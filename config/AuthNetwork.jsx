import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const api = async (url, method, body) => {
  // axios.defaults.baseURL = "http://192.168.0.15:8080";
  axios.defaults.baseURL = "http://34.41.123.200";

  try {
    const res = await axios({
      url,
      method,
      data: body,
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("access_token")}`,
      },
    });
    return res;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
