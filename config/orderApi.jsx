// orderApi.js
import { orderApi } from "../config/orderNetwork";

export const createOrder = async (data) => {
  const userRequestDto = {
    storeId: data.storeId,
    storeName: data.storeName,
    storeAddress: data.storeAddress,
    storePhone: data.storePhone,
    storeMinimumOrderAmount: data.storeMinimumOrderAmount,
    customerRequests: data.customerRequests,
    riderRequests: data.riderRequests,
    deliveryFee: data.deliveryFee,
    distanceFromStoreToCustomer: data.distanceFromStoreToCustomer,
    storeLongitude: data.storeLongitude,
    storeLatitude: data.storeLatitude,
    totalPrice: data.totalPrice,
    orderTotalPrice: data.orderTotalPrice,
    menuItems: data.menuItems.map((item) => ({
      menuName: item.menuName,
      totalPrice: item.totalPrice,
      selectedOptions: item.selectedOptions.map((optionList) => ({
        listName: optionList.listName,
        options: optionList.options.map((option) => ({
          optionTitle: option.optionTitle,
          optionPrice: option.optionPrice,
        })),
      })),
    })),
  };

  try {
    const res = await orderApi("api/v1/orders/", "post", userRequestDto);
    return res.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const selectByConsumerAll = async (offset) => {
  console.log("offset : " + offset);
  try{
      const res = await orderApi('api/v1/orders/customer/history','get',null, { 
        offset,
      });
      console.log(res.data);
      return res.data;
  }catch(error){
    throw error;
  }
};

export const searchOrder = async () => {
  try {
    const res = await orderApi("api/v1/orders/customer", "get");
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};

export const searchOrderHistory = async (startDate, endDate, pageNumber) => {
  console.log("startDate : " + startDate);
  console.log("endDate : " + endDate);
  console.log("pageNumber : " + pageNumber);
  try {
    const res = await orderApi("api/v1/orders/customer/history", "get", null, {
      startDate,
      endDate,
      pageNumber,
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching order history:", error);
    throw error;
  }
};

export const UserInformation = async () => {
  try {
    console.log("UserInformation 반응");
    const res = await orderApi("api/v1/orders/userInformation", "get");
      console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error in UserInformation ", error);
    throw error;
  }
};

export const updateState = async (orderId, data) => {
  try {
    const res = await orderApi(`api/v1/orders/request/${orderId}`, "post", data);
    return res.data;
  } catch (error) {
    console.error("Error in updateState", error);
    throw error;
  }
};

export const createOrderAndReturnUUID = async (data) => {
  const userRequestDto = {
    storeId: data.storeId,
    storeName: data.storeName,
    storeAddress: data.storeAddress,
    storePhone: data.storePhone,
    storeMinimumOrderAmount: data.storeMinimumOrderAmount,
    customerRequests: data.customerRequests,
    riderRequests: data.riderRequests,
    deliveryFee: data.deliveryFee,
    distanceFromStoreToCustomer: data.distanceFromStoreToCustomer,
    storeLongitude: data.storeLongitude,
    storeLatitude: data.storeLatitude,
    totalPrice: data.totalPrice,
    orderTotalPrice: data.orderTotalPrice,
    menuItems: data.menuItems.map((item) => ({
      menuName: item.menuName,
      totalPrice: item.totalPrice,
      selectedOptions: item.selectedOptions.map((optionList) => ({
        listName: optionList.listName,
        options: optionList.options.map((option) => ({
          optionTitle: option.optionTitle,
          optionPrice: option.optionPrice,
        })),
      })),
    })),
  };

  try {
    const res = await orderApi("/api/v1/orders/return", "post", userRequestDto);
    return res.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};
