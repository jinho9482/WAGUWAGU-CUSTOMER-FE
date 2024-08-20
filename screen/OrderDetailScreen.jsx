import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-elements";

const OrderDetailScreen = ({ route, navigation }) => {
  const { selectedOrder, userName } = route.params;
  console.log("Received userName:", userName);

  const extractStatusText = (orderState) => {
    if (orderState && orderState.length > 0) {
      const lastState = orderState[orderState.length - 1];
      return lastState.split(":")[0];
    }
    return "";
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerText}>주문 상세</Text>
        <View style={styles.detailCard}>
          <Text style={styles.detailText}>
            가게 이름:{" "}
            <Text style={styles.detailValue}>{selectedOrder.storeName}</Text>
          </Text>
          <Text style={styles.detailText}>
            가게 주소:{" "}
            <Text style={styles.detailValue}>{selectedOrder.storeAddress}</Text>
          </Text>
          <Text style={styles.detailText}>
            고객 주소:{" "}
            <Text style={styles.detailValue}>
              {selectedOrder.customerAddress}
            </Text>
          </Text>
          <Text style={styles.detailText}>
            주문 상태:{" "}
            <Text
              style={[
                styles.detailValue,
                {
                  color: getStatusColor(
                    extractStatusText(selectedOrder.orderState)
                  ),
                },
              ]}
            >
              {extractStatusText(selectedOrder.orderState)}
            </Text>
          </Text>
          <Text style={styles.detailText}>
            요청사항:{" "}
            <Text style={styles.detailValue}>
              {selectedOrder.customerRequests || "없음"}
            </Text>
          </Text>
          <Text style={styles.detailText}>
            배달 요청사항:{" "}
            <Text style={styles.detailValue}>
              {selectedOrder.riderRequests || "없음"}
            </Text>
          </Text>
        </View>

        {selectedOrder.menuItems &&
          selectedOrder.menuItems.map((menuItem, index) => (
            <View key={index} style={styles.detailCard1}>
              <Text style={styles.centeredText}>메뉴: {menuItem.menuName}</Text>
              {menuItem.selectedOptions &&
                menuItem.selectedOptions.map((optionList, optListIndex) => (
                  <View key={optListIndex} style={styles.optionList}>
                    {optionList.options &&
                      optionList.options.map((option, optIndex) => (
                        <Text key={optIndex} style={styles.optionText}>
                          옵션: {option.optionTitle}: {option.optionPrice}원
                        </Text>
                      ))}
                  </View>
                ))}
              {/* Only show the price once per menu item */}
              {menuItem.totalPrice && (
                <Text style={styles.optionText}>
                  주문 금액: {menuItem.totalPrice}원
                </Text>
              )}
            </View>
          ))}
        <Text style={styles.totalAmountText}>
          총 주문 금액:{" "}
          <Text style={styles.totalAmountValue}>
            {selectedOrder.orderTotalPrice}원
          </Text>
        </Text>

        {extractStatusText(selectedOrder.orderState) === "배달 완료" && (
          <Button
            title="리뷰 쓰러가기"
            buttonStyle={styles.button}
            onPress={() =>
              navigation.navigate("ReviewScreen", {
                storeId: selectedOrder.storeId,
                storeName: selectedOrder.storeName,
                userName: userName,
              })
            }
          />
        )}
        {extractStatusText(selectedOrder.orderState) === "배달중" && (
          <Button
            title="라이더 실시간 위치 확인"
            buttonStyle={styles.button}
            onPress={() =>
              navigation.navigate("RiderRealTimeLocationScreen", {
                orderItem: selectedOrder,
              })
            }
          />
        )}
      </ScrollView>
    </View>
  );
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
      return "#000000";
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  detailCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  detailCard1: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  detailText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  detailValue: {
    fontWeight: "bold",
  },
  menuItemCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  menuItemText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  menuItemValue: {
    fontWeight: "bold",
  },
  optionList: {
    marginLeft: 10,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 14,
    color: "#666",
  },
  totalAmountText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 15,
    textAlign: "center",
  },
  totalAmountValue: {
    color: "#E55959",
  },
  button: {
    backgroundColor: "#2B6DEF",
    borderRadius: 10,
    marginTop: 20,
  },
});

export default OrderDetailScreen;
