export const getCartByUserId = async (userId) => {
  const res = await api("api/v1/cart/${userId}", "get");
  return res;
};
