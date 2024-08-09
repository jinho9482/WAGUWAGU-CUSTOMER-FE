// orderApi.js
import { orderApi } from "../config/orderNetwork";

export const createOrder = async (data) => {
  const userRequestDto = {
    storeId: data.storeId,
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
    orderTotalAmount: data.orderTotalAmount,
    storeDeliveryFee: data.storeDeliveryFee,
    deliveryFee: data.deliveryFee,
    distanceFromStoreToCustomer: data.distanceFromStoreToCustomer,
    storeLongitude: data.storeLongitude,
    storeLatitude: data.storeLatitude,
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

export const searchOrder = async () => {
  try {
    const res = await orderApi('api/v1/order/customer/', 'get');
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};

export const searchOrderHistory = async (startDate, endDate, pageNumber) => {
  try {
    const res = await orderApi(
      'api/v1/order/history',
      'get',
      {
        startDate,
        endDate,
        pageNumber,
      }
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error('Error fetching order history:', error);
    throw error;
  }
};

export const UserInformation = async () => {
  try {
    const res = await orderApi('api/v1/order/userInformation', 'get');
    console.log('orderApi 호출 :' + res.data);
    return res.data;
  } catch (error) {
    console.error('Error in UserInformation ', error);
    throw error;
  }
};

export const updateState = async (orderId, data) => {
  try {
    const res = await orderApi(`api/v1/order/request/${orderId}`, 'post', data);
    return res.data;
  } catch (error) {
    console.error('Error in updateState', error);
    throw error;
  }
};
