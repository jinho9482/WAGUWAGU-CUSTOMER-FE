// OptionList.jsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../assets/constants/theme";

const OptionList = ({ optionList, onOptionChange }) => {
  const handleOptionToggle = (optionId) => {
    const updatedOptions = optionList.options.map((option) =>
      option.optionId === optionId
        ? { ...option, isChecked: !option.isChecked }
        : option
    );
    onOptionChange(updatedOptions);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{optionList.listName}</Text>
      {optionList.options.map((option) => (
        <TouchableOpacity
          key={option.optionId}
          style={styles.option}
          onPress={() => handleOptionToggle(option.optionId)}
        >
          <Text style={styles.optionText}>
            {option.optionTitle} (+{option.optionPrice}원)
          </Text>
          <Text style={styles.checkbox}>
            {option.isChecked && <View style={styles.checkboxChecked} />}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 10, padding: 20 },
  title: { fontSize: 18, fontWeight: "bold" },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  optionText: { fontSize: 16 },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.gray,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  checkboxChecked: {
    width: 20,
    height: 20,
    backgroundColor: COLORS.darkgray,
    borderRadius: 3,
  },
});

export default OptionList;
