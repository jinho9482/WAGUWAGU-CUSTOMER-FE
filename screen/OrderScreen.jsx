import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput } from "react-native";

export default function OrderScreen() {
  const [riderRequest, setRiderRequest] = useState("");
  const [consumerRequest, setConsumerRequest] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [showInput1, setShowInput1] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>주문하기</Text>
      <View style={styles.deliveryInfo}>
        <Text style={styles.deliveryText}>한집 배달</Text>
        <Image
          source={require('../assets/ugoolee.png')}
          style={styles.image}
        />
        <Text style={styles.deliveryText}>15분~30분</Text>
      </View>
      <View style={styles.section}>
      <TouchableOpacity
          style={styles.button}
          onPress={() => setShowInput(!showInput)}
        >
          <Text style={styles.buttonText}>고객 요청사항</Text>
        </TouchableOpacity>
        {showInput && (
          <TextInput
            style={styles.input}
            placeholder="고객 요청 사항을 입력하세요"
            value={consumerRequest}
            onChangeText={setConsumerRequest}
          />
        )}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>고객 주소 보여주기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowInput1(!showInput)}
        >
          <Text style={styles.buttonText}>라이더 요청 사항</Text>
        </TouchableOpacity>
        {showInput1 && (
          <TextInput
            style={styles.input}
            placeholder="라이더 요청 사항을 입력하세요"
            value={riderRequest}
            onChangeText={setRiderRequest}
          />
        )}
                <TouchableOpacity
          style={styles.button}
          onPress={() => setShowInput(!showInput)}
        >
          <Text style={styles.buttonText}>가게 사장 요청 사항</Text>
        </TouchableOpacity>
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
        <Text style={styles.paymentDetail}>총금액 35678원</Text>
        <Text style={styles.paymentDetail}>할인 금액 -3216원</Text>
        <Text style={styles.paymentDetail}>최종 금액 32424원</Text>
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
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#dcdcdc',
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
