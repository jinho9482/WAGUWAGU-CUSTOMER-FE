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

const MenuDetailScreen = ({ navigation, route }) => {
  const { menuId } = route.params;
  const [selectedOptions, setSelectedOptions] = useState({});
  const [menuDetails, setMenuDetails] = useState(null);
  const [optionLists, setOptionLists] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMenuDetails = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.17:8080/api/v1/menu/${menuId}`,
        {
          timeout: 20000,
        }
      );
      setMenuDetails(response.data);
    } catch (error) {
      console.error("Error fetching menu details:", error.message);
    }
  };

  const fetchOptionList = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.17:8080/api/v1/option-lists/menu/${menuId}`
      );
      setOptionLists(response.data);
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

  const handleOptionChange = (updatedOptions, listId) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [listId]: updatedOptions,
    }));
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
              source={require("../assets/images/베스트개발자.png")}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.menuIntroduction}>
              메뉴 설명: {menuDetails.menuIntroduction}
            </Text>
            <Text style={styles.menuPrice}>{menuDetails.menuPrice}원</Text>
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );

  const calculateTotalPrice = () => {
    let optionTotalPrice = 0;

    optionLists.forEach((list) => {
      const selectedOptionIds = selectedOptions[list.listId] || [];
      list.options.forEach((option) => {
        if (selectedOptionIds.includes(option.optionId)) {
          optionTotalPrice += option.optionPrice || 0;
        }
      });
    });

    return (menuDetails?.menuPrice || 0) + optionTotalPrice;
  };

  const renderOptionLists = () => (
    <View>
      {optionLists.length > 0 ? (
        optionLists.map((list) => (
          <OptionList
            key={list.listId}
            optionList={list}
            selectedOptions={selectedOptions[list.listId]}
            onOptionChange={(updatedOptions) =>
              handleOptionChange(updatedOptions, list.listId)
            }
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
        onPress={() => navigation.navigate("Mycart")}
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
        <ActivityIndicator size="large" color={COLORS.primary} />
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
              <Text style={styles.totalPriceText}>
                총 가격: {calculateTotalPrice()}원
              </Text>
            </View>
          </>
        )}
      />
      <TouchableOpacity
        style={styles.addToCartButton}
        // onPress={handleAddToCart}
      >
        <Text style={styles.addToCartButtonText}>장바구니에 담기</Text>
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
    backgroundColor: COLORS.primary,
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
});

export default MenuDetailScreen;
