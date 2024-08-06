// components/ReviewForm.js

import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { AirbnbRating } from "react-native-ratings";

const ReviewForm = () => {
  const [rating, setRating] = useState(1);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>리뷰</Text>
      </View>
      <Text style={styles.label}></Text>
      <TextInput
        style={styles.input}
        placeholder="리뷰를 작성하세요."
        multiline
        numberOfLines={4}
      />

      <AirbnbRating onFinishRating={(value) => setRating(value)} />

      <Button
        title="리뷰 작성하기"
        onPress={() => console.log("리뷰 작성 버튼 ")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  ratingButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedRatingButton: {
    backgroundColor: "#4caf50",
  },
  ratingText: {
    color: "#000",
    fontSize: 18,
  },
  headerContainer: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 16,
  },
});

export default ReviewForm;
