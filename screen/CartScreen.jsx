import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const CartScreen = ({ route }) => {
  const { menuName } = route.params;
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCartItems = async () => {
    const userId = await AsyncStorage.getItem("customerId");
    try {
      const response = await axios.get(
        `http://192.168.0.26:8080/api/v1/cart/${userId}`
      );
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
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!cart) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No items in the cart</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.optionTitle} 1</Text>
      <Text style={styles.itemPrice}>Price: {item.optionPrice}원</Text>
      <Text style={styles.itemChecked}>
        Checked: {item.isChecked ? "Yes" : "No"}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.menuName}> {menuName}</Text>
      <Text style={styles.totalPrice}>Total Price: {cart.totalPrice}원</Text>
      {cart.selectedOptions.map((list) => (
        <View key={list.listId} style={styles.listContainer}>
          <Text style={styles.listName}>{list.listName} </Text>
          <FlatList
            data={list.options}
            renderItem={renderItem}
            keyExtractor={(item) => item.optionId.toString()}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
  },
  menuName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  totalPrice: {
    fontSize: 20,
    marginBottom: 20,
  },
  listContainer: {
    marginBottom: 20,
  },
  listName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  itemTitle: {
    fontSize: 18,
  },
  itemPrice: {
    fontSize: 16,
  },
  itemChecked: {
    fontSize: 16,
  },
});

export default CartScreen;
