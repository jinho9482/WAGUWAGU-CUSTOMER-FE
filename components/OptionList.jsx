import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";
import { COLORS, SIZES, FONTS } from "../assets/constants/theme";

const OptionList = ({ optionList, selectedOptions, onOptionChange }) => {
  const handleCheckOption = (optionId) => {
    const updatedOptions = selectedOptions.includes(optionId)
      ? selectedOptions.filter((id) => id !== optionId)
      : [...selectedOptions, optionId];

    // Notify parent of the updated selection
    onOptionChange(updatedOptions);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.listName}>{optionList.listName}</Text>
      {optionList.options.map((option) => (
        <View key={option.optionId} style={styles.itemContainer}>
          <Text style={styles.optionTitle}>{option.optionTitle}</Text>
          <Text style={styles.optionPrice}>{option.optionPrice}원</Text>
          <CheckBox
            checked={selectedOptions.includes(option.optionId)}
            onPress={() => handleCheckOption(option.optionId)}
            checkedColor={COLORS.primary}
            containerStyle={styles.checkBoxContainer}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
  },
  listName: {
    ...FONTS.h2,
    marginBottom: SIZES.padding,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SIZES.padding,
  },
  optionTitle: {
    ...FONTS.h3,
  },
  optionPrice: {
    ...FONTS.body4,
    color: COLORS.primary,
  },
  checkBoxContainer: {
    padding: 0,
    margin: 0,
    backgroundColor: COLORS.white,
    borderWidth: 0,
  },
});

export default OptionList;
