import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { getAllStoresNearUser } from "../config/storeApi";
import StoreListSpeechBubble from "../components-store/StoreListSpeechBubble";

export default function StoreListScreen({ navigation, route }) {
  const { category } = route.params;
  const [stores, setStores] = useState([]);
  const getAllStoresNearUserApi = async () => {
    try {
      const response = await getAllStoresNearUser({
        longitude: 127.00539708137512,
        latitude: 37.484274664803216,
        category: category,
      });
      console.log(response);
      setStores(response);
    } catch {
      console.log("error in getAllStoresNearUserApi");
      setStores([]);
    }
  };
  // const getStoresDistanceAndDeliveryFeeApi = async (storeId) => {
  //   try {
  //     const response = await getStoresDistanceAndDeliveryFee(storeId, {
  //       longitude: 127.0312101,
  //       latitude: 37.4732933,
  //       minute: 15,
  //     });
  //     console.log(response);
  //     setDeliveryInfo(response);
  //   } catch {
  //     console.log("error in getStoresDistanceAndDeliveryFeeApi");
  //   }
  // };

  useEffect(() => {
    getAllStoresNearUserApi();
  }, []);

  const dimensionWidth = Dimensions.get("window").width / 1.2;

  return (
    <View style={styles.container}>
      {stores ? (
        stores.map((store) => {
          return (
            <StoreListSpeechBubble
              key={store.storeId}
              width={dimensionWidth}
              title={store.storeName}
              time={
                parseInt(store.distanceFromStoreToCustomer * 4 + 10) +
                "~" +
                parseInt(store.distanceFromStoreToCustomer * 4 + 25) +
                "분"
              }
              storeMinimumOrderAmount={
                "최소 주문 금액 " + store.storeMinimumOrderAmount + "원"
              }
              fee={"배달팁 " + store.deliveryFee + "원"}
              onPress={() => {
                // navigation.navigate("StoreList");
              }}
            />
          );
        })
      ) : (
        <View style={styles.textContainer}>
          <Text style={styles.noExistStore}>텅!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  textContainer: {
    justifyContent: "center",
  },
  noExistStore: {
    fontSize: 50,
  },
});
