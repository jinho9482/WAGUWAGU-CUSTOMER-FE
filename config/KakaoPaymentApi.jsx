import { kakaoPaymentApi } from "./KakaoPaymentNetwork";

export const requestPayment = async (data) => {
  try {
    const res = await kakaoPaymentApi("/", "post", data);
    console.log(res);
    return res;
  } catch (error) {
    console.error("Error in requestPayment", error);
  }
};
