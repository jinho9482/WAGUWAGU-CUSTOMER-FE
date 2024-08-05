import { orderApi } from "../config/orderNetwork";
import { storeApi } from "./storeNetwork";

export const createOrder = async (data) => {
  const userRequestDto = {
    customerId: data.customerId,
    customerAddress: data.customerAddress,
    storeId: data.storeId,
    ownerId: data.ownerId,
    changeTime: data.changeTime,
    orderState: data.orderState,
    orderCreatedAt: data.orderCreatedAt,
    storePhone: data.storePhone,
    storeName: data.storeName,
    storeAddress: data.storeAddress,
    menuName: data.menuName,
    menuIntroduction: data.menuIntroduction,
    menuPrice: data.menuPrice,
    optionTitle: data.optionTitle,
    optionPrice: data.optionPrice,
    listName: data.listName,
    options: data.options,
    customerRequests: data.customerRequests,
    riderRequests: data.riderRequests,
    order: data.order,
    orderTotalAmount: data.orderTotalAmount,
    storeDeliveryFee: data.storeDeliveryFee,
    deliveryFee: data.deliveryFee,
    distanceFromStoreToCustomer: data.distanceFromStoreToCustomer,
    storeLongitude: data.storeLongitude,
    storeLatitude: data.storeLatitude,
    due: data.due,
    menuNameList: data.menuNameList,
  };

  try {
    const res = await orderApi("api/v1/order/", "post", userRequestDto);
    return res.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const searchOrder = async ({ consumerId }) => {
  try {
    console.log(consumerId);
    const res = await orderApi(
      `api/v1/order/consumer/${consumerId}/all`,
      "get"
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching order history:", error);
    throw error;
  }
};

export const getStoreInfoDetailByStoreId = async (storeId, data) => {
  console.log(storeId);
  try {
    const res = await storeApi(
      `api/v1/distance-cal/store/${storeId}`,
      "post",
      data
    );
    console.log("API response:", res.data);
    return res.data;
  } catch (error) {
    console.error("InfoDetailError in getStoreInfoDetailByStoreId", error);
    throw error;
  }
};

export const updateState = async (orderId, status) => {
  try {
    const res = await axios.post(`api/v1/order/request/${orderId}`, { status });
    return res.data;
  } catch (error) {
    console.error("Error in updateState", error);
  }
};
