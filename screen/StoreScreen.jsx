import React, { useEffect, useState } from "react";
import { getStoreDetail } from "../config/storeApi";
import { View } from "react-native";

export default function StoreScreen({ navigation, route }) {
  const { storeId } = route.params;
  const [store, setStore] = useState({});
  const getStoreDetailApi = async () => {
    try {
      const response = await getStoreDetail(storeId, {
        longitude: 127.00539708137512,
        latitude: 37.484274664803216,
      });
      console.log(response);
      setStore(response);
    } catch {
      console.log("error in getStoreDetailApi");
      setStore({});
    }
  };

  useEffect(() => {
    getStoreDetailApi();
  }, []);

  return <View></View>;
}
