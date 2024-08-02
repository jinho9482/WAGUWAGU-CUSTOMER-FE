import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { COLORS, SIZES, FONTS } from "../assets/constants/theme";
import OptionList from "../components/OptionList.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MenuDetailScreen = ({ navigation, route }) => {
  const { menuId, storeId, storeName } = route.params;

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [menuDetails, setMenuDetails] = useState(null);
  const [optionLists, setOptionLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchMenuDetails = async () => {
    try {
      const response = await axios.get(
        `http://34.69.39.99/api/v1/menu/${menuId}`,
        {
          timeout: 20000,
        }
      );
      console.log("menuid :", menuId);
      setMenuDetails(response.data);
      setTotalPrice(response.data.menuPrice);
    } catch (error) {
      console.error("Error fetching menu details:", error.message);
    }
  };

  const fetchOptionList = async () => {
    try {
      const response = await axios.get(
        `http://34.69.39.99/api/v1/option-lists/menu/${menuId}`
      );

      setOptionLists(response.data);
      setSelectedOptions(response.data);
    } catch (error) {
      console.error("Error fetching option lists:", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchMenuDetails();
      await fetchOptionList();

      setLoading(false);
    };

    fetchData();
  }, [menuId]);

  const defaultSelectedOptions = () => {
    return selectedOptions || optionLists;
  };

  const handleOptionChange = (list, checkedOption) => {
    const newselectedOptions = defaultSelectedOptions().map((l) =>
      l.listId === list.listId
        ? {
            ...l,
            options: l.options.map((o) =>
              o.optionId === checkedOption.optionId
                ? { ...o, isChecked: !o.isChecked }
                : o
            ),
          }
        : l
    );
    setSelectedOptions(newselectedOptions);
    calculateTotalPrice(newselectedOptions);
  };
  console.log(JSON.stringify(selectedOptions));

  const fetchCartItems = async () => {
    const userId = await AsyncStorage.getItem("customerId");

    try {
      const response = await axios.get(
        `http://34.30.133.165/api/v1/cart/${userId}`
      );
      console.log("xxxxxxxxxxxxxxxxxxxxxxxfgfggf", response.data);
      if (response.data.menuItems) return response.data.menuItems;
      return null;
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const handleAddToCart = async () => {
    const userId = await AsyncStorage.getItem("customerId");

    const data = await fetchCartItems();

    const menuItems = data
      ? [
          ...data,
          {
            menuId: menuDetails.menuId,
            menuName: menuDetails.menuName,
            totalPrice: totalPrice,
            selectedOptions: selectedOptions.map((list) => ({
              listId: list.listId,
              listName: list.listName,
              options: list.options.filter((op) => op.isChecked),
            })),
          },
        ]
      : [
          {
            menuId: menuDetails.menuId,
            menuName: menuDetails.menuName,
            totalPrice: totalPrice,
            selectedOptions: selectedOptions.map((list) => ({
              listId: list.listId,
              listName: list.listName,
              options: list.options.filter((op) => op.isChecked),
            })),
          },
        ];
    const cartItem = {
      storeName: storeName,
      storeId: storeId,
      userId,
      totalPrice: totalPrice,
      menuItems,
    };

    try {
      const request = await axios.post(
        "http://34.30.133.165/api/v1/cart/save",
        cartItem,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      navigation.navigate("CartScreen", {
        menuId: menuDetails.menuId,
        menuName: menuDetails.menuName,
        storeName: storeName,
        storeId: storeId,
        totalPrice: totalPrice,
      });
    } catch (error) {
      console.error("Error adding to cart:", error.message);
    }
  };

  const renderFoodInfo = () => (
    <View>
      {menuDetails ? (
        <>
          <View>
            <Text style={styles.menuName}>{menuDetails.menuName}</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/삼겹김치덮밥.png")}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.menuIntroduction}>
              {menuDetails.menuIntroduction}
            </Text>
            <Text style={styles.menuPrice}>{menuDetails.menuPrice}원</Text>
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );

  const calculateTotalPrice = (selectedOptions = selectedOptions) => {
    const totalPrice = selectedOptions.reduce(
      (sum, list) =>
        sum +
        list.options.reduce(
          (t, op) => t + (op.isChecked ? op.optionPrice : 0),
          0
        ),
      menuDetails.menuPrice
    );
    setTotalPrice(totalPrice);
    console.log({ totalPrice });
    return totalPrice;
  };

  const renderOptionLists = () => (
    <View>
      {selectedOptions.length > 0 ? (
        selectedOptions.map((list) => (
          <OptionList
            key={list.listId}
            optionList={list}
            selectedOptions={selectedOptions}
            // onOptionChange={(updatedOptions) =>
            //   handleOptionChange(updatedOptions, list.listId)
            // }
            onOptionChange={handleOptionChange}
          />
        ))
      ) : (
        <Text>No option lists available</Text>
      )}
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require("../assets/icons/back.png")}
          resizeMode="contain"
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitle}>Menu Details</Text>
      </View>
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() =>
          navigation.navigate("CartScreen", {
            menuId: menuDetails.menuId,
            menuName: menuDetails.menuName,
            storeName: storeName,
          })
        }
      >
        <Image
          source={require("../assets/icons/shopping-basket.png")}
          resizeMode="contain"
          style={styles.cartIcon}
        />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.red} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <FlatList
        ListHeaderComponent={() => (
          <>
            {renderFoodInfo()}
            {renderOptionLists()}
            <View style={styles.totalPriceContainer}>
              <Text style={styles.totalPriceText}></Text>
            </View>
          </>
        )}
      />
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={handleAddToCart}
      >
        <Text style={styles.addToCartButtonText}>
          {" "}
          {totalPrice}원 장바구니에 담기
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  backButton: {
    width: 50,
    justifyContent: "center",
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cartButton: {
    width: 50,
    justifyContent: "center",
  },
  cartIcon: {
    width: 30,
    height: 30,
  },
  menuName: {
    marginVertical: 10,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  imageContainer: {
    height: 200,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  detailsContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 15,
    paddingHorizontal: 16,
  },
  menuIntroduction: {
    marginVertical: 10,
    textAlign: "center",
    fontSize: 18,
  },
  menuPrice: {
    fontSize: 16,
  },
  addToCartButton: {
    backgroundColor: "#FF3B30",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZES.radius,
    margin: SIZES.padding,
  },
  addToCartButtonText: {
    color: COLORS.white,
    fontSize: 18,
  },

  menuName: {
    ...FONTS.h1,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginVertical: SIZES.padding,
  },
  imageContainer: {
    borderRadius: SIZES.radius,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: SIZES.padding,
  },
  image: {
    width: "100%",
    height: 200,
  },
  detailsContainer: {
    paddingHorizontal: SIZES.padding,
    alignItems: "center",
  },
  menuIntroduction: {
    ...FONTS.body2,
    color: COLORS.darkGray,
    textAlign: "center",
    marginBottom: SIZES.padding,
  },
  menuPrice: {
    ...FONTS.h2,
    color: "#FF3B30",
    fontWeight: "bold",
    textAlign: "center",
  },
  loadingText: {
    ...FONTS.body1,
    color: COLORS.darkGray,
    textAlign: "center",
    marginTop: SIZES.padding,
  },
});

export default MenuDetailScreen;
