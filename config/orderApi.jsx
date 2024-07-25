import { orderApi } from '../config/orderNetwork';

export const createOrder = async (data) => {
    const userRequestDto = {
        customerId: data.customerId,
        customerAddress: data.customerAddress,
        ownerId: data.ownerId,
        changeTime: data.changeTime,
        orderState: data.orderState,
        orderCreatedAt: data.orderCreatedAt,
        storePhone: data.storePhone,
        storeName: data.storeName,
        storeAddressString: data.storeAddressString,
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
        menuNameList: data.menuNameList
    };

    try {
        const res = await orderApi('api/v1/order/history', 'post', userRequestDto);
        return res.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

export const searchHistory = async ({ consumerId }) => {
    try {
        const res = await orderApi(`api/v1/order/consumer/${consumerId}/history`, 'get');
        console.log(res.data)
        return res.data;
    } catch (error) {
        console.error('Error fetching order history:', error);
        throw error;
    }
};
