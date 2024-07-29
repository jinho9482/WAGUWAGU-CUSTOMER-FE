import {api} from "../config/AuthNetwork";

export const getInfo = async (data) => {
  const res = await api("/api/v1/customers", "get",data);
  return res;
};
export const updateInfo = async (data) => {
  const res = await api("/api/v1/customers", "put",data);
  return res;
};