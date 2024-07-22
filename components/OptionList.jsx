// OptionList.js
import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Option from "./Option";

const OptionList = ({ optionList }) => {
  const [options, setOptions] = useState(optionList.options);

  const toggleOption = (optionId) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.optionId === optionId
          ? { ...option, isChecked: !option.isChecked }
          : option
      )
    );
  };

  return (
    <View style={styles.listContainer}>
      <Text style={styles.listTitle}>{optionList.listName}</Text>
      <FlatList
        data={options}
        renderItem={({ item }) => (
          <Option option={item} onToggle={toggleOption} />
        )}
        keyExtractor={(item) => item.optionId.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    margin: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default OptionList;
