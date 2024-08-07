import axios from "axios";
const endpoint = "http://192.168.0.17:8080/graphql";

export const getMenuCategoryByStoreQL = async (variables) => {
  try {
    const data = await axios.post(
      endpoint,
      {
        query: `
          query getMenuCategoryByStoreId($storeId: ID) {
            getMenuCategoryByStoreId(storeId: $storeId) {
              menuCategoryId
              menuCategoryName
            }
          }
        `,
        variables: variables,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("데이터 확인" + data.data.data.getMenuCategoryByStoreId);
    return data.status === 200
      ? data.data.data.getMenuCategoryByStoreId
      : "error";
  } catch (error) {
    return error;
  }
};

export const getMenuByMenuCategoryQL = async (variables) => {
  try {
    const data = await axios.post(
      endpoint,
      {
        query: `
          query getAllMenuByMenuCategory($menuCategoryId: ID) {
            getAllMenuByMenuCategory(menuCategoryId: $menuCategoryId) {
              menuId
              menuName
              menuIntroduction
              menuPrice
              menuPossible
              menuImage
            }
          }
        `,
        variables: variables,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data.status === 200
      ? data.data.data.getAllMenuByMenuCategory
      : "error";
  } catch (error) {
    return error;
  }
};

export const getAllStoresNearUserQL = async (variables) => {
  try {
    const data = await axios.post(
      endpoint,
      {
        query: `
            mutation userNearStore($category: String,$input:UserLocationRequest ) {
              userNearStore(category: $category, input:$input) {
                ownerId
                storeId
                storeName
                storeAddress
                storeLongitude
                storeLatitude
                storeMinimumOrderAmount
                storeIntroduction
                storeImage
                distanceFromStoreToCustomer
                deliveryFee
              }
            }
          `,
        variables: variables,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return data.status === 200 ? data.data.data.userNearStore : null;
  } catch (error) {
    return error;
  }
};

export const getStoreDetailQL = async (variables) => {
  try {
    const data = await axios.post(
      endpoint,
      {
        query: `
            mutation storeInfoDetail($storeId: ID, $input : UserLocationRequest) {
              storeInfoDetail(storeId: $storeId,input:$input ) {
                ownerId
                storeId
                storeName
                storeAddress
                storeLongitude
                storeLatitude
                storeMinimumOrderAmount
                storeIntroduction
                storeImage
                distanceFromStoreToCustomer
                deliveryFee
              }
            }
          `,
        variables: variables,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data.status === 200 ? data.data.data.storeInfoDetail : "error";
  } catch (error) {
    return error;
  }
};

// MenuDetailScreen.jsx

export const getMenuByIdQL = async (variables) => {
  try {
    const data = await axios.post(
      endpoint,
      {
        query: `
            query getMenuById($menuId: ID) {
              getMenuById(menuId: $menuId) {
                menuId
                menuName
                menuIntroduction
                menuPrice
                menuPossible
                menuImage
              }
            }
          `,
        variables: variables,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data.status === 200 ? data.data.data.getMenuById : "error";
  } catch (error) {
    return error;
  }
};
