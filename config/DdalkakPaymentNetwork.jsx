import axios from "axios";
export const DdalkakPaymentApi = async (url, method, body, params) => {
  const res = await axios({
    url,
    method,
    baseURL: "https://just-click.shop/api/v1/payment-histories/OREloP7CLf", // baseURL
    data: body,
    params: params,
    // headers: {
    //   Authorization: "SECRET_KEY " + "DEV87242194E0968B352C4C75A326AC7A1DC4041",
    //   // "Content-Type": "application/json",
    // },
  });

  return res;
};
