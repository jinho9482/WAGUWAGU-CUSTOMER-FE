import { orderApi } from '../config/orderNetwork';
import { storeApi } from './storeNetwork';

export const createOrder = async (data) => {
    try {
        const res = await orderApi('api/v1/order/', 'post', data);
        return res.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

export const searchOrder = async ({ consumerId }) => {
    try {
      console.log(consumerId);
        const res = await orderApi(`api/v1/order/consumer/${consumerId}/all`, 'get');
        console.log(res.data)
        return res.data;
    } catch (error) {
        console.error('Error fetching order history:', error);
        throw error;
    }
};

export const getStoreInfoDetailByStoreId = async (storeId,data) => {
    try {
      const res = await storeApi(
        `api/v1/distance-cal/store/${storeId}`,
        "post",
        data
      );
      console.log('API response:', res.data);
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
