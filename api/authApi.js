import { api } from "../config/AuthNetwork";

//  fds
export const getInfo = async (data) => {
  const res = await api("/api/v1/auth/customers", "get", data);
  return res;
};
export const updateInfo = async (data) => {
  const res = await api("/api/v1/auth/customers", "put", data);
  return res;
};
