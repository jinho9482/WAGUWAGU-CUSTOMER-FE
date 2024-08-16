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
