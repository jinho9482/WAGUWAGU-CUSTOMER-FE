import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Rating } from "react-native-ratings";

const ReviewSectionScreen = ({ navigation, route }) => {
  const { storeId } = route.params;
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.26:8080/api/v1/reviews/store/${storeId}`
      );
      console.log(storeId);
      setReviews(response.data);
      console.log("리뷰", response.data);
    } catch (error) {
      console.log("error fetching reviews", error);
    }
  };

  useEffect(() => {
    console.log("storeId************" + storeId);
    if (storeId) {
      fetchReviews();
    }
  }, [storeId]);

  const renderReview = ({ item }) => (
    <View style={styles.reviewContainer}>
      <Text style={styles.userName}>{item.userName}</Text>
      <Text style={styles.timestamp}>
        {new Date(item.timestamp).toLocaleString()}
      </Text>
      <Rating
        type="star"
        fractions={1}
        startingValue={item.rating}
        imageSize={20}
        readonly
        style={styles.rating}
      />
      <Text style={styles.content}>{item.content}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.header}>리뷰</Text>
      <FlatList
        data={reviews}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderReview}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  reviewContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  timestamp: {
    fontSize: 14,
    color: "#888",
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
  },
});

export default ReviewSectionScreen;
