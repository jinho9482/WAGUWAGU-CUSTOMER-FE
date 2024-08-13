// components/ReviewForm.js

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
} from "react-native";
import { AirbnbRating, Rating } from "react-native-ratings";

const ReviewForm = () => {
  const [rating, setRating] = useState(1);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>리뷰</Text>
      </View>
      <View style={styles.reviewForm}>
        <TextInput
          style={styles.input}
          placeholder="리뷰를 작성하세요."
          multiline={true}
          numberOfLines={4}
        />

        {/* <AirbnbRating onFinishRating={(value) => setRating(value)} /> */}

        <Rating
          showRating
          onFinishRating={(value) => setRating(value)}
          style={{ paddingVertical: 10 }}
        />

        {/* <Button
        style={styles.reviewPostBtn}
        title="리뷰 작성하기"
        onPress={() => console.log("리뷰 작성 버튼 ")}
      /> */}

        <Pressable
          style={({ pressed }) => [
            styles.reviewPostBtn,
            pressed && styles.pressedButton,
          ]}
          onPress={() => console.log("리뷰 작성 버튼")}
        >
          <Text style={styles.buttonText}>리뷰 작성하기</Text>
        </Pressable>
      </View>
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
  reviewPostBtn: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#4CAF50", // Green background color
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#388E3C",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  pressedButton: {
    backgroundColor: "#388E3C", // Darker green when pressed
  },
  reviewForm: {
    backgroundColor: "#f9f9f9", // Light grey background for the form area
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ddd", // Light grey border
    shadowColor: "#000", // Shadow for elevation effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow effect
  },
});

export default ReviewForm;
