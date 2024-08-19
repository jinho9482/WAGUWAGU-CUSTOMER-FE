import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text } from "react-native-paper";

export default StoreScreenSpeechBubble = (props) => {
  return (
    <View
      style={[
        styles.container,
        { width: props.width }, // 동적 너비
        { height: props.height }, // 동적 높이
        { backgroundColor: props.backgroundColor }, // 동적 배경색
      ]}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text
          style={[
            styles.text,
            { color: props.textColor }, // 동적 텍스트 색상
          ]}
        >
          {props.content}
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderWidth: 1,
    borderColor: "#dcdcdc",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  text: {
    fontSize: 17,
    textAlign: "left",
  },
});
