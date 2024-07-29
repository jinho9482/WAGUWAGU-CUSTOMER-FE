import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createOrder, getStoreInfoDetailByStoreId } from '../config/orderApi';

export default function OrderScreen() {
  const [riderRequest, setRiderRequest] = useState("");
  const [consumerRequest, setConsumerRequest] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [showInput1, setShowInput1] = useState(false);
  const [menuName, setMenuName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [storeId, setStoreId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [orderData, setOrderData] = useState({

    changeTime: '2024-07-18T15:00:00',
    storePhone: '010-1234-5678',
    storeName: "",
    storeAddress: '서울 서초구 강남대로 615 1층',
    menuName: "",
    menuIntroduction: 'Delicious Pizza',
    menuPrice: 10000,
    optionTitle: 'Extra Cheese',
    optionPrice: 2000,
    listName: 'Menu List',
    options: 'Extra cheese',
    customerRequests: 'Extra cheese',
    riderRequests: 'Handle with care',
    order: '자장면, Pasta',
    orderTotalAmount: 22000,
    storeDeliveryFee: 2000,
    deliveryFee: 4000,
    customerRequests: "",
    riderRequests: "",
    distanceFromStoreToCustomer: 3,
    storeLongitude: 127.0189002,
    storeLatitude: 37.5166298,
    due: '2024-07-18T15:00:00',
    menuNameList: {
        "Level1Key": [
            {
                "Level2Key1": [
                    {
                        "Level3Key1": [
                            {
                                "Level4Key1": [
                                    "Item1",
                                    "Item2"
                                ]
                            }
                        ]
                    },
                    {
                        "Level3Key2": [
                            {
                                "Level4Key2": [
                                    "Item3",
                                    "Item4"
                                ]
                            }
                        ]
                    }
                ],
                "Level2Key2": [
                    {
                        "Level3Key3": [
                            {
                                "Level4Key3": [
                                    "Item5",
                                    "Item6"
                                ]
                            }
                        ]
                    },
                    {
                        "Level3Key4": [
                            {
                                "Level4Key4": [
                                    "Item7",
                                    "Item8"
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
  });

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const data = await getStoreInfoDetailByStoreId(storeId,{
          longitude:parseFloat(await AsyncStorage.getItem("customerLongitude")),
          latitude:parseFloat(await AsyncStorage.getItem("customerLatitude"))
  
        });

        console.log('API response:', data); 

        if (data && data.storeName) {
          setOrderData(prevState => ({
            ...prevState,
            ownerId: data.ownerId,
            storeName: data.storeName,
            storeAddress: data.storeAddress,
            storeLongitude: data.storeLongitude,
            storeLatitude: data.storeLatitude,
            storeMinimumOrderAmount: data.storeMinimumOrderAmount,
            storeIntroduction: data.storeIntroduction,
            storePhone: data.storePhone,
            deliveryFee: data.deliveryFee,
          }));
        } else {
          console.error('Store data is not in the expected format:', data);
        }
      } catch (error) {
        console.error("Failed to fetch store data:", error);
      }
    };

    const fetchCustomerData = async () => {
      try {
        const address = await AsyncStorage.getItem("customerAddress");
        
        if (address) {
          setCustomerAddress(address);
        }

        const id = await AsyncStorage.getItem("customerId");
        if (id) {
          setCustomerId(id);
        }
      } catch (error) {
        console.error("Failed to fetch customer data:", error);
      }
    };

    fetchStoreData();
    fetchCustomerData();
  }, [storeId]);

  const handleCreateOrder = async () => {
    try {
      const id = customerId;
      const address = customerAddress; 
      const updatedOrderData = {
        ...orderData,
        storeId: storeId,
        customerId: id, 
        customerAddress: address,
        customerRequests: consumerRequest,
        riderRequests: riderRequest,
      };
      const result = await createOrder(updatedOrderData);
      console.log('Order created successfully:', result);
    } catch (error) {
      console.error('Failed to create order:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>주문하기</Text>
     
      <View style={styles.deliveryInfo}>
        <Text style={styles.deliveryText}>한집 배달</Text>
        <Text style={styles.deliveryText}>15분~30분</Text>
      </View>
      <View>
        <Text style={styles.deliveryText}>customerAddress: {customerAddress}</Text>
      </View>
      <View>
        <Text style={styles.deliveryText}>customerId: {customerId}</Text>
      </View>
      <View>
        <Text style={styles.deliveryText}>storeName: {orderData.storeName}</Text>
        <Text style={styles.deliveryText}>ownerId: {orderData.ownerId}</Text>
        <Text style={styles.deliveryText}>storeIntroduction: {orderData.storeIntroduction}</Text>
      </View>
      <View style={styles.section}>
        <TextInput
          style={styles.input}
          placeholder="가게 ID를 입력하세요"
          value={storeId}
          onChangeText={setStoreId}
        />
        
        <TextInput
          style={styles.input}
          placeholder="메뉴 이름을 입력하세요"
          value={menuName}
          onChangeText={setMenuName}
        />

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
        <Text style={styles.paymentDetail}>총금액 전달받은 돈 원</Text>
        <Text style={styles.paymentDetail}>할인 금액 -3216원</Text>
        <Text style={styles.paymentDetail}>최종 금액 32424원</Text>
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
  container: {
    flex: 1,
    padding: 20,
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
    backgroundColor: '#94D35C',
    padding: 15,
    borderRadius: 25,
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderColor: '#ccc',
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
  paymentDetail: {
    fontSize: 16,
    textAlign: "center",
  },
});
