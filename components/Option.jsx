import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";
import { COLORS } from "../assets/constants/theme"; // Ensure the path is correct

const Option = ({ option, onToggle }) => {
  return (
    <View style={styles.optionContainer}>
      <Text style={styles.optionTitle}>{option.optionTitle}</Text>
      <Text style={styles.optionPrice}>{option.optionPrice}원</Text>
      <CheckBox
        checked={option.isChecked}
        onPress={() => onToggle(option.optionId)}
        containerStyle={styles.checkboxContainer}
        checkedColor={COLORS.darkgray} // Adjust according to your theme
      />
    </View>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  optionTitle: {
    flex: 1,
    fontSize: 16,
  },
  optionPrice: {
    width: 50,
    textAlign: "right",
    fontSize: 16,
  },
  checkboxContainer: {
    padding: 0,
    margin: 0,
  },
});

export default Option;
