import axios from "axios";
export const riderLocationApi = async (url, method, body, params) => {
  const res = await axios({
    url,
    method,
    baseURL: "https://waguwagu.shop", // baseURL
    data: body,
    params: params,
    //   headers: {
    //     Authorization: getToken(),
    //   },
  });

  return res;
};
