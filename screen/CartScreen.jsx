import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";

const getCartByUserId = async (userId) => {
  try {
    const res = await axios.get(
      `http://192.168.0.26:8080/api/v1/cart/userId?userId=${userId}`
    );
    return res.data;
  } catch (error) {
    console.error(
      "Error fetching cart:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const CartScreen = ({ userId }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await getCartByUserId(5);
        setCart(cartData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error fetching cart: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      {cart ? (
        <View>
          <Text style={styles.title}>장바구니</Text>
          <Text>Store: {cart.store.storeName}</Text>
          <Text>Total Price: {cart.totalPrice}원</Text>
          <Text>Options:</Text>
          {cart.optionList.options.map((option) => (
            <Text key={option.optionId}>
              {option.optionTitle}: {option.optionPrice}원 (
              {option.checked ? "Checked" : "Unchecked"})
            </Text>
          ))}
        </View>
      ) : (
        <Text>장바구니가 비어있습니다.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default CartScreen;
