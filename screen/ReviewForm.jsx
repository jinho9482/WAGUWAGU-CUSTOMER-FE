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
import { AirbnbRating } from "react-native-ratings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ReviewForm = () => {
  const [rating, setRating] = useState(1);
  const [content, setContent] = useState("");

  const handlePostReview = async () => {
    const userId = await AsyncStorage.getItem("customerId");
    const storeId = 4;
    const userName = "소성민";
    const reviewReq = {
      reviewerId: userId,
      content: content,
      userName: userName,
      storeId: storeId,
      rating: rating,
    };

    try {
      const request = await axios.post(
        "http://192.168.0.26:8080/api/v1/reviews",
        reviewReq,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("revieqw request :", reviewReq);
    } catch (error) {
      console.error("Error uploading review:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}></Text>
      </View>
      <Text style={styles.label}></Text>
      <TextInput
        style={styles.input}
        placeholder="리뷰를 작성하세요."
        multiline
        numberOfLines={10}
        value={content}
        onChangeText={setContent}
      />

      <AirbnbRating onFinishRating={(value) => setRating(value)} />

      <Pressable style={styles.reviewButton} onPress={handlePostReview}>
        <Text style={styles.reviewButtonText}>리뷰 작성하기</Text>
      </Pressable>
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
  reviewButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  reviewButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ReviewForm;
