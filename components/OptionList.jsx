import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";
import { COLORS, SIZES, FONTS } from "../assets/constants/theme";

const OptionList = ({ optionList, selectedOptions = [], onOptionChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.listName}>{optionList.listName}</Text>
      {optionList.options.map((option) => {
        console.log(option);
        return (
          <View key={option.optionId} style={styles.itemContainer}>
            <Text style={styles.optionTitle}>{option.optionTitle}</Text>
            <Text style={styles.optionPrice}>{option.optionPrice}원</Text>
            <CheckBox
              checked={option.isChecked}
              onPress={() => onOptionChange(optionList, option)}
              checkedColor={COLORS.primary}
              containerStyle={styles.checkBoxContainer}
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SIZES.padding,
    padding: SIZES.padding,
    backgroundColor: COLORS.white, // Background color for the option list
    borderRadius: SIZES.radius, // Rounded corners

    elevation: 5, // Shadow elevation for Android
  },
  listName: {
    ...FONTS.h2, // Font styling
    marginBottom: SIZES.padding, // Space below the list name
    color: COLORS.primary, // Color to match the theme
    fontWeight: "bold", // Bold text
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center", // Center items vertically
    justifyContent: "space-between", // Space between text and checkbox
    marginVertical: SIZES.padding / 2, // Space between items
    paddingVertical: SIZES.padding / 2, // Padding for each item
    borderBottomWidth: 1, // Border below each item
    borderBottomColor: COLORS.lightGray, // Border color
  },
  optionTitle: {
    ...FONTS.h3, // Font styling for option title
    color: COLORS.darkGray, // Color for the title
    flex: 1, // Take up available space
  },
  optionPrice: {
    ...FONTS.body4, // Font styling for price
    color: COLORS.primary, // Price color to match the theme
    marginHorizontal: SIZES.padding, // Space around price
  },
  checkBoxContainer: {
    padding: 0,
    margin: 0,
    backgroundColor: "transparent", // Transparent background
    borderWidth: 0, // No border
  },
});

export default OptionList;
