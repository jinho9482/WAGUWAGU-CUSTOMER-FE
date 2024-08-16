import { paymentApi } from "./PaymentNetwork";

export const createPayment = async (body) => {
  try {
    await paymentApi(`/api/v1/payments`, "post", body);
  } catch (error) {
    console.error("Error in createPayment", error);
  }
};
