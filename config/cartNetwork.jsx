import axios from "axios";
export const storeApi = async (url, method, body, params) => {
  const res = await axios({
    url,
    method,
    baseURL: "http://34.45.108.74", // baseURL
    data: body,
    params: params,
  });

  return res;
};
