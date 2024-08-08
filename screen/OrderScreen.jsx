import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createOrder, getStoreInfoDetailByStoreId } from "../config/orderApi";
import { getStoreDetailQL } from "../config/storeGraphQL";

export default function OrderScreen({ route }) {
  const [riderRequest, setRiderRequest] = useState("");
  const [consumerRequest, setConsumerRequest] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [showInput1, setShowInput1] = useState(false);
  const [menuName, setMenuName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [storeId, setStoreId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [cartTotal, setCartTotal] = useState(0);
  const [cart, setCart] = useState({});
  const [error, setError] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    if (route.params) {
      setCartTotal(route.params.cartTotal || 0);
      setCart(route.params.cart || {});
      setStoreId(route.params.cart ? route.params.cart.storeId : "");
    } else {
      setError(true);
    }
  }, [route.params]);

  const handleCreateOrder = async () => {
    try {
      console.log("Cart details:", cart);
      const id = await AsyncStorage.getItem("customerId");
      const customerAddress = await AsyncStorage.getItem("customerAddress");
      const customerLongitude = parseFloat(
        await AsyncStorage.getItem("customerLongitude")
      );
      const customerLatitude = parseFloat(
        await AsyncStorage.getItem("customerLatitude")
      );

      const storeInfo = await getStoreDetailQL({
        storeId: cart.storeId,
        input: {
          longitude: customerLongitude,
          latitude: customerLatitude,
        },
      });
      console.log("Store Info:", storeInfo);

      const dueDate = new Date();
      dueDate.setMinutes(dueDate.getMinutes() + 30);

      const userRequest = {
        customerId: id,
        storeId: cart.storeId,
        ownerId: cart.ownerId,
        storePhone: cart.storePhone,
        storeName: cart.storeName,
        storeAddress: storeInfo.storeAddress,
        customerRequests: consumerRequest,
        riderRequests: riderRequest,
        deliveryFee: storeInfo.deliveryFee,
        distanceFromStoreToCustomer: storeInfo.distanceFromStoreToCustomer,
        storeLongitude: storeInfo.storeLongitude,
        storeLatitude: storeInfo.storeLatitude,
        storeMinimumOrderAmount: cart.storeMinimumOrderAmount,
        customerAddress: customerAddress,
        menuItems: cart.menuItems.map((item) => ({
          menuName: item.menuName,
          totalPrice: item.totalPrice,
          selectedOptions: item.selectedOptions.map((optionList) => ({
            listName: optionList.listName,
            options: optionList.options.map((option) => ({
              optionTitle: option.optionTitle,
              optionPrice: option.optionPrice,
            })),
          })),
        })),
        optionTitle: cart.optionTitle || "",
        optionPrice: cart.optionPrice || 0,
        listName: cart.listName || "",
        options: cart.options || [],
        menuName: menuName,
        totalPrice: cartTotal,
        selectedOptions: cart.selectedOptions || [],
        customerLongitude: customerLongitude,
        customerLatitude: customerLatitude,
        due: dueDate.toISOString(),
      };

      const result = await createOrder(userRequest);
      console.log("Order created successfully:", result);

      // Show success alert and navigate to HomeScreen
      Alert.alert("주문 성공", "주문이 성공적으로 생성되었습니다.", [
        {
          text: "확인",
          onPress: () => navigation.navigate("HomeScreen"),
        },
      ]);
    } catch (error) {
      console.error("Failed to create order:", error);
      setError(true); // Set the error state to true
    }
  };

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>텅~</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.container}
    >
      <View style={styles.deliveryInfo}>
        <Text style={styles.deliveryText}>한집 배달</Text>
        <Text style={styles.deliveryText}>15분~30분</Text>
      </View>

      <Text style={styles.title}>주문하기</Text>
      <Text style={styles.cartDetail}>가게 이름: {cart.storeName}</Text>

      {cart.menuItems &&
        cart.menuItems.map((item, index) => (
          <View key={index} style={styles.menuItem}>
            <Text style={styles.menuItemText}>메뉴 이름: {item.menuName}</Text>
            <Text style={styles.menuItemText}>가격: {item.totalPrice}원</Text>
            {item.selectedOptions &&
              item.selectedOptions.map((optionList, optListIndex) => (
                <View key={optListIndex} style={styles.optionList}>
                  <Text style={styles.optionListTitle}>
                    {optionList.listName}
                  </Text>
                  {optionList.options &&
                    optionList.options.map((option, optIndex) => (
                      <Text key={optIndex} style={styles.optionText}>
                        옵션: {option.optionTitle} ({option.optionPrice}원)
                      </Text>
                    ))}
                </View>
              ))}
          </View>
        ))}

      <View style={styles.section}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowInput1(!showInput1)}
        >
          <Text style={styles.buttonText}>라이더님께 요청 사항 전달</Text>
        </TouchableOpacity>
        {showInput1 && (
          <TextInput
            style={styles.input}
            placeholder="라이더 요청 사항을 입력해주세요"
            value={riderRequest}
            onChangeText={setRiderRequest}
          />
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowInput(!showInput)}
        >
          <Text style={styles.buttonText}>가게 사장님께 요청 사항 전달</Text>
        </TouchableOpacity>
        {showInput && (
          <TextInput
            style={styles.input}
            placeholder="가게 사장님께 요청 사항을 입력해주세요"
            value={consumerRequest}
            onChangeText={setConsumerRequest}
          />
        )}

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>결제수단</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>할인 쿠폰</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>선물함</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>포인트</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.paymentSection}>
        <Text style={styles.paymentText}>결제금액</Text>
        <Text style={styles.cartDetail}>총 가격: {cartTotal}원</Text>
      </View>

      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handleCreateOrder}>
          <Text style={styles.buttonText}>주문하기</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  deliveryInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  deliveryText: {
    fontSize: 16,
    backgroundColor: "#E0F7EF",
    padding: 10,
    borderRadius: 20,
  },
  section: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#94D35C",
    padding: 15,
    borderRadius: 25,
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    fontSize: 16,
  },
  paymentSection: {
    backgroundColor: "#A5D6A7",
    padding: 20,
    borderRadius: 25,
    marginBottom: 20,
  },
  paymentText: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 10,
  },
  errorText: {
    fontSize: 24,
    color: "#ff0000",
    textAlign: "center",
  },
});
