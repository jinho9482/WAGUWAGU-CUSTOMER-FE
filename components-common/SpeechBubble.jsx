import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";

export default SpeechBubble = (props) => {
  return (
    <Button styles={[styles.container, { color: props.textColor }]}>
      <Text>{props.content}</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "30px",
    height: "30px",
    color: "#94D35C",
    backgroundColor: "#94D35C",
    alignItems: "flex-start",
    justifyContent: "center",
  },
});
