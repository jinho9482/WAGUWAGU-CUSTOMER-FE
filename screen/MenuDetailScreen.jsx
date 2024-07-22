import React from "react";
import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZES, COLORS, FONTS } from "../assets/constants/theme";
import OptionList from "../components/OptionList.jsx";

const optionListData = {
  listId: 1,
  listName: "Basic Options",
  options: [
    {
      optionId: 1,
      optionTitle: "Extra Cheese",
      optionPrice: 10,
      isChecked: true,
    },
    {
      optionId: 2,
      optionTitle: "Extra Sauce",
      optionPrice: 5,
      isChecked: false,
    },
    {
      optionId: 3,
      optionTitle: "Bacon",
      optionPrice: 15,
      isChecked: true,
    },
  ],
};

const MenuDetailScreen = () => {
  function renderHeader() {
    return (
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
  }

  function renderFoodInfo() {
    return (
      <View>
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
          <Text
            style={{ marginVertical: 10, textAlign: "center", ...FONTS.h2 }}
          >
            Delicious Pizza
          </Text>
          <Text style={{ ...FONTS.body3 }}>맛있는 피자</Text>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderFoodInfo()}
      <OptionList optionList={optionListData} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
});

export default MenuDetailScreen;
