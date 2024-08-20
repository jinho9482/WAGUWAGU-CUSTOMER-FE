import axios from "axios";
export const kakaoPaymentApi = async (url, method, body, params) => {
  const res = await axios({
    url,
    method,
    baseURL: "https://open-api.kakaopay.com/online/v1/payment/ready", // baseURL
    data: body,
    params: params,
    headers: {
      Authorization: "SECRET_KEY " + "DEV87242194E0968B352C4C75A326AC7A1DC4041",
      // "Content-Type": "application/json",
    },
  });

  return res;
};
