import { storeApi } from "./storeNetwork";

// export const getAllStores = async () => {
//   try {
//     const res = await storeApi(`/api/v1/store`, "get");
//     return res.data;
//   } catch (error) {
//     console.error("Error in getAllStores", error);
//   }
// };

export const getAllStoresNearUser = async (data) => {
  try {
    const res = await storeApi(
      `/api/v1/distance-cal/user-near-store`,
      "post",
      data
    );
    return res.data;
  } catch (error) {
    // console.error("Error in getAllStoresNearUser", error);
  }
};

export const getStoreDetail = async (storeId, data) => {
  try {
    const res = await storeApi(
      `/api/v1/distance-cal/store/${storeId}`,
      "post",
      data
    );
    return res.data;
  } catch (error) {
    // console.error("Error in getStoreDetail", error);
  }
};


// export const getStoresDistanceAndDeliveryFee = async (storeId, data) => {
//   try {
//     const res = await storeApi(
//       `/api/v1/distance-cal/store/${storeId}/accept-order`,
//       "post",
//       data
//     );
//     return res.data;
//   } catch (error) {
//     console.error("Error in getStoresDistanceAndDeliveryFee", error);
//   }
// };
