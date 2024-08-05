import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { getAllStores, getAllStoresNearUser } from "../config/storeApi";
import StoreListSpeechBubble from "../components-store/StoreListSpeechBubble";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllStoresNearUserQL } from "../config/storeGraphQL";

export default function StoreListScreen({ navigation, route }) {
  const { category } = route.params;
  const [stores, setStores] = useState([]);

  const getAllStoresNearUserApi = async () => {
    // const customerLatitude = 0.0;
    // const customerLongitude = 0.0;
    try {
      const response = await getAllStoresNearUserQL({
        category: category,
        input: {
          longitude: parseFloat(
            await AsyncStorage.getItem("customerLongitude")
          ),
          latitude: parseFloat(await AsyncStorage.getItem("customerLatitude")),
        },
      });
      console.log(
        "customerLongitude" +
          parseFloat(await AsyncStorage.getItem("customerLongitude"))
      );
      console.log(
        "customerLatitude" +
          parseFloat(await AsyncStorage.getItem("customerLatitude"))
      );
      console.log("category" + category);
      // const response = await getAllStoresNearUser({
      //   longitude: 127.027619,
      //   latitude: 37.497952,
      //   category: category,
      // });
      console.log("+++++++++++++++++++++++" + response);
      setStores(response);
    } catch {
      console.log("error in getAllStoresNearUserApi hi");
      setStores([]);
    }
  };

  useEffect(() => {
    getAllStoresNearUserApi();
  }, []);

  const dimensionWidth = Dimensions.get("window").width / 1.2;

  return (
    <View style={styles.container}>
      {stores ? (
        stores.map((store) => {
          return (
            <TouchableOpacity
              key={store.storeId}
              onPress={() =>
                navigation.navigate("Store", { storeId: store.storeId })
              }
            >
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
                  "최소 주문 금액 : " + store.storeMinimumOrderAmount + "원"
                }
                fee={"배달팁 : " + store.deliveryFee + "원"}
                onPress={() => {
                  // navigation.navigate("StoreList");
                }}
              />
            </TouchableOpacity>
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
