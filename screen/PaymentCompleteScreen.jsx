import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function PaymentCompleteScreen({ orderId }) {
  const [paymentCompleted, setPaymentCompleted] = useState("");

  const getPaymentState = () => {};

  useEffect(() => {}, []);

  return (
    <>
      <View style={styles.deliveryInfo}>
        <Text style={styles.deliveryText}>{}</Text>
        <Text style={styles.deliveryText}>15분~30분</Text>
      </View>

      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, { marginBottom: 40 }]}
          onPress={() => handlePaymentAndOrder(cartTotal)}
        >
          <Text style={styles.buttonText}>{paymentButtonText}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
});
