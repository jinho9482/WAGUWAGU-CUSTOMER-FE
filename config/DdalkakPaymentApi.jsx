import axios from "axios";
import { DdalkakPaymentApi } from "./DdalkakPaymentNetwork";

export const requestDdalkakPayment = async (data) => {
  try {
    const res = await DdalkakPaymentApi("", "post", data);
    console.log(res);
    return res;
  } catch (error) {
    console.error("Error in requestDdalkakPayment", error);
  }
};

export const getPaymentState = async (payId) => {
  try {
    const res = await axios.get(
      `https://just-click.shop/api/v1/payment-histories/${payId}`
    );
    console.log(res);
    return res.data;
  } catch (error) {
    console.error("Error in getPaymentState", error);
  }
};
