import axios from "axios";
export const storeApi = async (url, method, body, params) => {
  const res = await axios({
    url,
    method,
    baseURL: "http://192.168.0.26:8080", // baseURL
    data: body,
    params: params,
  });

  return res;
};
