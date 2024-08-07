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
import { searchOrder } from "../config/orderApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OrderHistorySpeechBubble from "../components-order/OrderHistorySpeechBubble";
import { Button } from "react-native-elements";

export default function OrderHistoryScreen({ navigation }) {
  const [selectedId, setSelectedId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const dimensionWidth = Dimensions.get("window").width / 1.6;
  const dimensionHeight = 100;

  //리뷰를 위해 추가된

  const handledGetHistory = async () => {
    try {
      const consumerId = await AsyncStorage.getItem("customerId");
      const result = await searchOrder({ consumerId });
      console.log(result);
      setOrders(result);
      setRefreshing(false);
    } catch (error) {
      console.log("Failed to searchHistory:", error);
      setError("Failed to fetch order history");
      setRefreshing(false);
    }
  };

  useEffect(() => {
    handledGetHistory();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
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
        return "#2B6DEF";
      case "배달 수락":
        return "#F3DD0F";
      case "조리중":
        return "#94D35C";
      case "주문 요청":
        return "#E55959";
      case "배달중":
        return "#6E5656";
      case "배달 완료":
        return "#808080";
      default:
        return "#ffffff";
    }
  };

  const Item = ({ item, onPress }) => {
    console.log("Item:", item);

    const lastStatus = extractStatusText(item.orderState);
    const backgroundColor = getStatusColor(lastStatus);
    const textColor = item.orderId === selectedId ? "white" : "black";

    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.item, { backgroundColor }]}
      >
        <OrderHistorySpeechBubble
          height={dimensionHeight}
          width={dimensionWidth}
          textColor={textColor}
          content={`${item.storeName}\n${lastStatus || "No status"}`}
          backgroundColor={backgroundColor}
        />
      </TouchableOpacity>
    );
  };

  const handleItemPress = (item) => {
    setSelectedId(item.orderId);
    setSelectedOrder(item);
    setIsDetailsVisible(true);
  };

  const handleBackgroundPress = () => {
    setIsDetailsVisible(false);
  };

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
          {orders.map((item) => (
            <Item
              key={item.orderId}
              item={item}
              onPress={() => handleItemPress(item)}
            />
          ))}
        </ScrollView>
        {isDetailsVisible && selectedOrder && (
          <View style={styles.detailsContainer}>
            <Text>가게 이름: {selectedOrder.storeName}</Text>
            <Text>가게 주소: {selectedOrder.storeAddress}</Text>
            <Text>고객님 주소: {selectedOrder.customerAddress}</Text>
            <Text>
              고객님의 주문건 상태:{" "}
              {extractStatusText(selectedOrder.orderState)}
            </Text>
            <Text>Customer Requests: {selectedOrder.customerRequests}</Text>
            <Text>Rider Requests: {selectedOrder.riderRequests}</Text>
            {selectedOrder.menuItems &&
              selectedOrder.menuItems.map((menuItem, index) => (
                <View key={index} style={styles.menuItemDetail}>
                  <Text> 메뉴 이름: {menuItem.menuName}</Text>
                  {menuItem.selectedOptions &&
                    menuItem.selectedOptions.map((optionList, optListIndex) => (
                      <View key={optListIndex} style={styles.optionList}>
                        {optionList.options &&
                          optionList.options.map((option, optIndex) => (
                            <Text key={optIndex}>
                              Option: {option.optionTitle}: {option.optionPrice}
                              원
                            </Text>
                          ))}
                        <Text> 주문 금액: {menuItem.totalPrice}원</Text>
                      </View>
                    ))}
                </View>
              ))}
            {extractStatusText(selectedOrder.orderState) === "배달 완료" && (
              <Button
                title="리뷰 쓰러가기"
                onPress={() => navigation.navigate("ReviewScreen")}
              />
            )}
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    padding: 10,
  },
  search: {
    margin: 20,
  },
  scrollViewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  menuItemDetail: {
    marginVertical: 10,
  },
  optionList: {
    marginLeft: 10,
  },
  orderStateText: {
    fontSize: 14,
    marginVertical: 2,
  },
});
