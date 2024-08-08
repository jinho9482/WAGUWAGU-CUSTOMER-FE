import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const api = async (url, method, body = null, params = {}) => {
  // axios.defaults.baseURL = "http://192.168.0.15:8080";
  axios.defaults.baseURL = "http://34.41.123.200";

  try {
    const res = await axios({
      url,
      method,
      data: body,
      params: params, // Add params handling
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