// import { createOrder } from './orderApi';

    export const createOrder = async (data) => {
        const userRequestDto = {
            customerId: data.customerId,
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
            const res = await orderApi('/history', 'post', userRequestDto);
            return res.data; // Return the response data
        } catch (error) {
            console.error('Error creating order:', error);
            throw error; // Re-throw the error for further handling
        }
};