import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useRecoilState } from "recoil";
import { cartState } from "../state/CartState.js";
import { SIZES, COLORS, FONTS } from "../assets/constants/theme";

const CartScreen = ({ route }) => {
  const userId = route.params?.userId; // Extract userId from route params
  const [cart, setCart] = useRecoilState(cartState);

  // Fetch cart items from the server using the userId
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `http://192.168.0.26:8080/api/v1/cart/userId?userId=${userId}`
        );
        setCart(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [userId]);

  // Render cart items
  const renderCartItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <Text style={styles.cartItemStore}>{item.store.storeName}</Text>
      <Text style={styles.cartItemPrice}>{item.totalPrice}원</Text>
      <Text style={styles.cartItemOptions}>
        {item.optionList.options.map((option) => (
          <Text key={option.optionId} style={styles.cartItemOption}>
            {option.optionTitle} (+{option.optionPrice}원)
          </Text>
        ))}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.cartId.toString()}
        contentContainerStyle={styles.flatListContent}
      />
      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => {
          // Handle checkout process
          console.log("Proceeding to checkout...");
        }}
      >
        <Text style={styles.checkoutButtonText}>결제하기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
  cartItemContainer: {
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  cartItemStore: {
    ...FONTS.h2,
    color: COLORS.black,
  },
  cartItemPrice: {
    ...FONTS.body3,
    color: COLORS.primary,
  },
  cartItemOptions: {
    ...FONTS.body4,
    color: COLORS.darkGray,
  },
  cartItemOption: {
    marginVertical: 2,
  },
  flatListContent: {
    paddingBottom: 80,
  },
  checkoutButton: {
    backgroundColor: "#94D35C",
    padding: SIZES.padding * 2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.white,
    borderRadius: SIZES.radius,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  checkoutButtonText: {
    ...FONTS.h2,
    color: COLORS.white,
  },
});

export default CartScreen;
