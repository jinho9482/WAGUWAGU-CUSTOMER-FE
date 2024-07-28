import { storeApi } from "./storeNetwork";

export const getAllStores = async () => {
  try {
    const res = await storeApi(`/api/v1/store`, "get");
    return res.data;
  } catch (error) {
    console.error("Error in getAllStores", error);
  }
};

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

// StoreScreen

export const getMenuCategoryByStore = async (storeId) => {
  try {
    console.log({ storeId });
    const res = await storeApi(`/api/v1/menu-category/store/${storeId}`, "get");

    return res.data;
  } catch (error) {
    console.error("Error in getMenuCategoryByStore", error);
  }
};

export const getMenuByMenuCategory = async (menuCategoryId) => {
  try {
    const res = await storeApi(
      `/api/v1/menu/menu-category/${menuCategoryId}`,
      "get"
    );
    return res.data;
  } catch (error) {
    // console.error("Error in getMenuByMenuCategory", error);
  }
};
