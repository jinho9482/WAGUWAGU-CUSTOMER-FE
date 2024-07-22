import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function OrderScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>주문하기</Text>
      <View style={styles.deliveryInfo}>
        <Text style={styles.deliveryText}>한집 배달</Text>
        <Text style={styles.deliveryText}>15분~30분</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>고객 요청사항</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>고객 주소 보여주기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>라이더 요청 사항</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>가게 사장 요청 사항</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>결제수단</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>할인 쿠폰</Text>
          <Text style={styles.buttonText}>선물함</Text>
          <Text style={styles.buttonText}>포인트</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.paymentSection}>
        <Text style={styles.paymentText}>결제금액</Text>
        <Text style={styles.paymentDetail}>총금액 35678원</Text>
        <Text style={styles.paymentDetail}>할인 금액 -3216원</Text>
        <Text style={styles.paymentDetail}>최종 금액 32424원</Text>
      </View>
    </View>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#A5D6A7",
    padding: 15,
    borderRadius: 25,
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
  },
  paymentSection: {
    backgroundColor: "#A5D6A7",
    padding: 20,
    borderRadius: 25,
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
