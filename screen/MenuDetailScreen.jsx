import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZES, COLORS, FONTS } from "../assets/constants/theme";
import OptionList from "../components/OptionList.jsx";

const basePrice = 20000;

const MenuDetailScreen = () => {
  const [optionList1, setOptionList1] = useState({
    listId: 1,
    listName: "기본 옵션",
    options: [
      {
        optionId: 1,
        optionTitle: "치즈 추가",
        optionPrice: 1000,
        isChecked: false,
      },
      {
        optionId: 2,
        optionTitle: "핫소스 추가",
        optionPrice: 500,
        isChecked: false,
      },
      {
        optionId: 3,
        optionTitle: "베이컨 추가",
        optionPrice: 300,
        isChecked: false,
      },
    ],
  });

  const [optionList2, setOptionList2] = useState({
    listId: 2,
    listName: "리뷰 서비스 선택",
    options: [
      {
        optionId: 1,
        optionTitle: "콜라 제공",
        optionPrice: 0,
        isChecked: false,
      },
      {
        optionId: 2,
        optionTitle: "올리브 추가",
        optionPrice: 0,
        isChecked: false,
      },
      {
        optionId: 3,
        optionTitle: "스파게티",
        optionPrice: 0,
        isChecked: false,
      },
    ],
  });

  const [totalPrice, setTotalPrice] = useState(basePrice);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const optionsTotalPrice = [...optionList1.options, ...optionList2.options]
        .filter((option) => option.isChecked)
        .reduce((sum, option) => sum + option.optionPrice, 0);
      setTotalPrice(basePrice + optionsTotalPrice);
    };

    calculateTotalPrice();
  }, [optionList1, optionList2]);

  const handleOptionChange = (updatedOptions, listId) => {
    if (listId === 1) {
      setOptionList1((prevState) => ({
        ...prevState,
        options: updatedOptions,
      }));
    } else if (listId === 2) {
      setOptionList2((prevState) => ({
        ...prevState,
        options: updatedOptions,
      }));
    }
  };

  const renderFoodInfo = () => (
    <View>
      <View>
        <Text style={{ marginVertical: 10, textAlign: "center", ...FONTS.h2 }}>
          피자가게
        </Text>
      </View>
      <View style={{ height: SIZES.height * 0.3 }}>
        <Image
          source={require("../assets/images/pizza.jpg")}
          resizeMode="cover"
          style={{
            width: SIZES.width,
            height: "100%",
          }}
        />
      </View>
      <View
        style={{
          width: SIZES.width,
          alignItems: "center",
          marginTop: 15,
          paddingHorizontal: SIZES.padding * 2,
        }}
      >
        <Text style={{ marginVertical: 10, textAlign: "center", ...FONTS.h2 }}>
          피자피자피자피자
        </Text>
        <Text style={{ ...FONTS.body3 }}>20,000원</Text>
      </View>
    </View>
  );

  const renderTotalPrice = () => (
    <View
      style={{
        alignItems: "center",
        marginTop: 15,
        paddingHorizontal: SIZES.padding * 2,
      }}
    >
      <Text style={{ ...FONTS.h2 }}>Total Price</Text>
      <Text style={{ ...FONTS.body3 }}>{totalPrice}원</Text>
    </View>
  );

  const renderHeader = () => (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        style={{
          width: 50,
          paddingLeft: SIZES.padding * 2,
          justifyContent: "center",
        }}
        // onPress={() => navigation.goBack()}
      >
        <Image
          source={require("../assets/icons/back.png")}
          resizeMode="contain"
          style={{
            width: 30,
            height: 30,
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: SIZES.padding * 3,
            borderRadius: SIZES.radius,
            // backgroundColor: COLORS.lightGray3
          }}
        ></View>
      </View>

      <TouchableOpacity
        style={{
          width: 50,
          paddingRight: SIZES.padding * 2,
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../assets/icons/shopping-basket.png")}
          resizeMode="contain"
          style={{
            width: 30,
            height: 30,
          }}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[]}
        ListHeaderComponent={
          <>
            {renderHeader()}
            {renderFoodInfo()}
            <OptionList
              optionList={optionList1}
              onOptionChange={(updatedOptions) =>
                handleOptionChange(updatedOptions, 1)
              }
            />
            <OptionList
              optionList={optionList2}
              onOptionChange={(updatedOptions) =>
                handleOptionChange(updatedOptions, 2)
              }
            />
            {renderTotalPrice()}
          </>
        }
        ListFooterComponent={
          <TouchableOpacity style={styles.addToCartButton}>
            <Text style={styles.addToCartButtonText}>장바구니에 추가</Text>
          </TouchableOpacity>
        }
        contentContainerStyle={styles.scrollViewContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
  scrollViewContent: {
    paddingBottom: 80, // Extra padding to prevent the content from being cut off
  },
  addToCartButton: {
    backgroundColor: "#94D35C",
    padding: SIZES.padding * 2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.white,
    borderRadius: SIZES.radius,
  },
  addToCartButtonText: {
    ...FONTS.h2,
    color: COLORS.white,
  },
});

export default MenuDetailScreen;
