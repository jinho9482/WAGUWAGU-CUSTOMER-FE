import {api} from "../config/AuthNetwork";

export const getInfo = async (data) => {
  const res = await api("/customers", "get",data);
  return res;
};
export const updateInfo = async (data) => {
  const res = await api("/customers", "put",data);
  return res;
};