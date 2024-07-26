import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const CartScreen = ({ route, navigation }) => {
  const { storeName } = route.params;
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCartItems = async () => {
    const userId = await AsyncStorage.getItem("customerId");
    try {
      const response = await axios.get(
        `http://192.168.0.26:8080/api/v1/cart/${userId}`
      );
      console.log("Cart data:", JSON.stringify(response.data));
      setCart(response.data);
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

  const renderOptionItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.optionTitle}</Text>
      <Text style={styles.itemPrice}>Price: {item.optionPrice}원</Text>
    </View>
  );

  const renderMenuItem = ({ item }) => (
    <View style={styles.cartDetailsContainer}>
      <Text style={styles.menuName}>{item.menuName}</Text>
      {item.selectedOptions && item.selectedOptions.length > 0 ? (
        item.selectedOptions
          .filter((list) => list.options && list.options.length > 0)
          .map((list) => (
            <View key={list.listId} style={styles.listContainer}>
              <Text style={styles.listName}>{list.listName}</Text>
              <FlatList
                data={list.options}
                renderItem={renderOptionItem}
                keyExtractor={(option) => option.optionId.toString()}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            </View>
          ))
      ) : (
        <Text style={styles.noOptionsText}>No options selected</Text>
      )}
    </View>
  );

  const renderHeader = () => (
    <View>
      <Pressable
        style={styles.storeContainer}
        onPress={() => navigation.navigate("Store")}
      >
        <Text style={styles.storeName}>{storeName}</Text>
      </Pressable>
      <Text style={styles.totalPrice}>총 가격: {cart.totalPrice}원</Text>
    </View>
  );

  const renderFooter = () => (
    <Pressable style={styles.button} onPress={() => alert("Button Pressed")}>
      <Text style={styles.buttonText}>Checkout</Text>
    </Pressable>
  );

  return (
    <FlatList
      style={styles.container}
      data={cart.menuItems}
      renderItem={renderMenuItem}
      keyExtractor={(item) => item.menuId.toString()}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
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
    borderRadius: 10,
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
    color: "#388E3C",
    textAlign: "center",
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#2E7D32",
  },
  listContainer: {
    marginBottom: 20,
  },
  listName: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    color: "#388E3C",
  },
  itemContainer: {
    marginBottom: 10,
    padding: 16,
    backgroundColor: "#FFF",
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
    color: "#2E7D32",
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
  button: {
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 20,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default CartScreen;
