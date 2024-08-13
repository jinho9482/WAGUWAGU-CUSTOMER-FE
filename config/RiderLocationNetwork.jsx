import axios from "axios";
export const riderLocationApi = async (url, method, body, params) => {
  const res = await axios({
    url,
    method,
    baseURL: "http://34.68.136.4", // baseURL
    data: body,
    params: params,
    //   headers: {
    //     Authorization: getToken(),
    //   },
  });

  return res;
};
