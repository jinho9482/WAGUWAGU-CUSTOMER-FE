import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  RefreshControl,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import {
  searchOrder,
  UserInformation,
  selectByConsumerAll,
} from "../config/orderApi";
import { Button } from "react-native-elements";

export default function OrderHistoryScreen({ navigation }) {
  const [selectedId, setSelectedId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [userName, setUserName] = useState("");

  const handledGetHistory = async () => {
    try {
      const userInfo = await UserInformation();
      const customerId = userInfo.customerId;
      setUserName(userInfo.customerNickname);

      const result = await searchOrder({ customerId });

      if (JSON.stringify(result) !== JSON.stringify(orders)) {
        setOrders(result);
      }

      const historyResult = await selectByConsumerAll(offset);

      if (historyResult.length > 0) {
        const newOrderHistory = [...orderHistory, ...historyResult];
        if (JSON.stringify(newOrderHistory) !== JSON.stringify(orderHistory)) {
          setOrderHistory(newOrderHistory);
          setOffset((prevOffset) => prevOffset + 10);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setError("Failed to fetch order history");
    } finally {
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      handledGetHistory();

      const interval = setInterval(() => {
        handledGetHistory();
      }, 10000);

      return () => clearInterval(interval);
    }, [orders, orderHistory])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setOffset(0);
    setOrderHistory([]);
    handledGetHistory();
  }, []);

  const extractStatusText = (orderState) => {
    if (orderState && orderState.length > 0) {
      const lastState = orderState[orderState.length - 1];
      return lastState.split(":")[0];
    }
    return "";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "배달요청":
        return "#D7E9FA";
      case "배달 수락":
        return "#F8EB71";
      case "조리중":
        return "#94D35C80";
      case "주문 요청":
        return "#E5595980";
      case "배달중":
        return "#EACCBA";
      case "배달 완료":
        return "#6E565680";
      default:
        return "#ffffff80";
    }
  };

  const OrderItem = ({ item, onPress }) => {
    const lastStatus = extractStatusText(item.orderState);
    const backgroundColor = getStatusColor(lastStatus);

    return (
      <TouchableOpacity onPress={onPress} style={[styles.item]}>
        <View style={[styles.orderCard, { backgroundColor }]}>
          <View style={styles.textContainer}>
            <Text style={styles.storeName}>{item.storeName}</Text>
            <Text style={styles.orderStatus}>{lastStatus || "No status"}</Text>
            <Text style={styles.menuItem}>
              {item && item.menuItems && item.menuItems.length > 0
                ? item.menuItems[0].menuName
                : "요청 사항 없음"}
            </Text>
            <Text style={styles.deliveryRequest}>
              {item && item.deliveryRequest
                ? item.deliveryRequest
                : "요청 사항 없음"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const handleItemPress = (item) => {
    setSelectedId(item.orderId);
    navigation.navigate("OrderDetailScreen", {
      selectedOrder: item,
      userName: userName,
    });
  };

  const handleBackgroundPress = () => {};

  return (
    <TouchableWithoutFeedback onPress={handleBackgroundPress}>
      <View style={styles.container}>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>현재 주문건</Text>
            {orders.map((item) => (
              <OrderItem
                key={item.orderId}
                item={item}
                onPress={() => handleItemPress(item)}
              />
            ))}
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>배달완료건</Text>
            {orderHistory.map((item, index) => (
              <OrderItem
                key={index}
                item={item}
                onPress={() => handleItemPress(item)}
              />
            ))}
          </View>

          {hasMore && (
            <TouchableOpacity onPress={handledGetHistory}>
              <Text style={styles.loadMoreText}>더 보기</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  scrollViewContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
  sectionContainer: {
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  orderCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  storeName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  orderStatus: {
    fontSize: 16,
    color: "#666",
    marginVertical: 5,
  },
  menuItem: {
    fontSize: 14,
    color: "#3C3232",
  },
  deliveryRequest: {
    fontSize: 14,
    color: "#3C3232",
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "left",
    color: "#333",
  },
  loadMoreText: {
    color: "#007BFF",
    marginVertical: 10,
    fontSize: 16,
    textAlign: "center",
  },
});
