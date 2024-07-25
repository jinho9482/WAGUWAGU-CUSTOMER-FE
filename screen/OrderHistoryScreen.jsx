import React, { useState, useEffect, useCallback } from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ScrollView, TouchableWithoutFeedback, RefreshControl } from "react-native";
import SpeechBubble from "../components-common/SpeechBubble";
import { searchHistory } from '../config/orderApi';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OrderHistoryScreen() {
  const [selectedId, setSelectedId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const dimensionWidth = Dimensions.get("window").width / 4;

 


  const handledGetHistory = async () => {
    try { 
      const consumerId = await AsyncStorage.getItem("customerId")
      const result = await searchHistory({ consumerId: consumerId});

      console.log('searchHistory successfully:', result);
      setOrders(result);
      setRefreshing(false);
    } catch (error) {
      console.log('Failed to searchHistory:', error);
      setError('Failed to fetch order history');
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

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item]}>
      <SpeechBubble
        height={100}
        width={dimensionWidth}
        textColor={textColor}
        content={`${item.storeName}\n${item.menuName}`}
        backgroundColor={backgroundColor}
      />
    </TouchableOpacity>
  );

  const handleItemPress = (item) => {
    setSelectedId(item.orderId.timestamp);
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
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {orders.filter(order => order.menuName).map((item) => {
            const backgroundColor = item.orderId.timestamp === selectedId ? "#94D35C" : "#ffffff";
            const color = item.orderId.timestamp === selectedId ? "white" : "black";
            return (
              <Item
                key={item.orderId.timestamp}
                item={item}
                onPress={() => handleItemPress(item)}
                backgroundColor={backgroundColor}
                textColor={color}
              />
            );
          })}
        </ScrollView>
        {isDetailsVisible && selectedOrder && (
          <View style={styles.detailsContainer}>
            <Text>Menu Name: {selectedOrder.menuName}</Text>
            <Text>customerAddress: {selectedOrder.customerAddress}</Text>
            <Text>option Name: {selectedOrder.optionTitle}</Text>
            <Text>Order Total Amount: {selectedOrder.orderTotalAmount}</Text>
            <Text>Store Name: {selectedOrder.storeName}</Text>
            <Text>Store Address: {selectedOrder.storeAddressString}</Text>
            <Text>Order State: {selectedOrder.orderState.join(", ")}</Text>
            <Text>Customer Requests: {selectedOrder.customerRequests}</Text>
            <Text>Rider Requests: {selectedOrder.riderRequests}</Text>

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  search: {
    margin: 20,
  },
  scrollViewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
