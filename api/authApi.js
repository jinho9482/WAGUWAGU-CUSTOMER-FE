import {api} from "../config/AuthNetwork";

export const getToken = async (data) => {
  const res = await api("/customers/callback?code="+data.code, "get");
  return res;
};