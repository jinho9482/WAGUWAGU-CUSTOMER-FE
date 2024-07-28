import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "react-native-elements";

const CartScreen = ({ route, navigation }) => {
  const { menuName, storeName, totalPrice } = route.params;
  const [cart, setCart] = useState(null);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCartItems = async () => {
    const userId = await AsyncStorage.getItem("customerId");
    try {
      const response = await axios.get(
        `http://192.168.0.26:8080/api/v1/cart/${userId}`
      );
      console.log("fgfggf", JSON.stringify(response.data));
      setCart(response.data);
      const total = response.data.menuItems.reduce((acc, menu) => {
        const menuTotal = menu.selectedOptions.reduce((optAcc, list) => {
          const listTotal = list.options.reduce((optionAcc, option) => {
            return optionAcc + option.optionPrice;
          }, 0);
          return optAcc + listTotal;
        }, 0);
        return acc + menuTotal;
      }, 0);
      setCartTotal(total);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!cart) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No items in the cart</Text>
      </View>
    );
  }

  const renderItem = ({ item }) =>
    item.map((it) => (
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{it.optionTitle}</Text>
        <Text style={styles.itemPrice}>Price: {it.optionPrice}원</Text>
      </View>
    ));

  console.log(JSON.stringify(cart));
  if (!cart)
    return (
      <View style={styles.container}>
        <Text>텅! </Text>
      </View>
    );
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.scrollViewCon}>
        <ScrollView>
          <Pressable
            style={styles.storeContainer}
            onPress={() => navigation.navigate("Store")}
          >
            <Text style={styles.storeName}>{storeName}</Text>
          </Pressable>
          <Text style={styles.totalPrice}>총 가격: {cartTotal}원</Text>
          {cart.menuItems.map((menu, i) => (
            <View
              style={styles.cartDetailsContainer}
              key={menu.menuId + " " + i}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text style={styles.menuName}>
                  {menu.menuName} ={menu.totalPrice}
                </Text>

                <Pressable>
                  <Image
                    source={require("../assets/icons/trash-can.png")}
                    resizeMode="contain"
                    style={styles.trash}
                  />
                </Pressable>
              </View>
              {menu.selectedOptions && menu.selectedOptions.length > 0 ? (
                menu.selectedOptions
                  .filter((list) => list.options && list.options.length > 0)
                  .map((list) => (
                    <View key={list.listId} style={styles.listContainer}>
                      <Text style={styles.listName}>{list.listName}</Text>
                      {renderItem({ item: list.options })}
                    </View>
                  ))
              ) : (
                <Text style={styles.text}>No options selected</Text>
              )}
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewCon: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F7F7F7",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
    color: "#333",
  },
  cartDetailsContainer: {
    backgroundColor: "#FFF",
    borderRadius: 20, // Increased border radius
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  menuName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#black",
    textAlign: "center",
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#FF3B30",
  },
  listContainer: {
    marginBottom: 20,
  },
  listName: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    color: "#black",
  },
  itemContainer: {
    marginBottom: 10,
    padding: 16,
    backgroundColor: "#E2EBDE",
    borderRadius: 10,
    borderColor: "#E0E0E0",
    borderWidth: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },
  itemPrice: {
    fontSize: 16,
    color: "#FF9500",
    marginVertical: 5,
  },
  itemChecked: {
    fontSize: 16,
    color: "#4CD964",
  },
  storeContainer: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  storeName: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 10,
  },
  noOptionsText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },

  trash: {
    width: 24,
    height: 24,
    tintColor: "#94D35C", // Adjust color as needed
  },
});

export default CartScreen;
