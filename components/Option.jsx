// Option.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";

const Option = ({ option, onToggle }) => {
  return (
    <View style={styles.optionContainer}>
      <Text style={styles.optionTitle}>{option.optionTitle}</Text>
      <Text style={styles.optionPrice}>${option.optionPrice}</Text>
      <CheckBox
        checked={option.isChecked}
        onPress={() => onToggle(option.optionId)}
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
});

export default Option;
