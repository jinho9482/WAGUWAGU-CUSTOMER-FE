import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Text } from "react-native-paper";

export default StoreListSpeechBubble = (props) => {
  return (
    <View
      style={[
        styles.container,
        // { width: props.width },
        { width: props.width },
        { backgroundColor: props.backgroundColor },
      ]}
    >
      <View style={styles.imageContainer}>
        <Image
          style={[styles.image, { resizeMode: "contain" }]}
          source={props.image?{uri:"https://storage.googleapis.com/wgwg_bucket/"+props.image}:require("./../assets/food icon.png")}
        />
      </View>
      <View>
        <Text
          numberOfLines={1}
          style={[styles.textTitle, { paddingBottom: 15 }]}
        >
          {props.title}
        </Text>

        <Text style={[styles.text]}>{props.time}</Text>

        <Text style={[styles.text]}>{props.storeMinimumOrderAmount}</Text>

        <Text style={[styles.text]}>{props.fee}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    padding: 13,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    height: 150,
    color: "#94D35C",
    backgroundColor: "#FFFFFF",
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 3,
    borderColor: "#dcdcdc",
  },
  textTitle: {
    fontSize: 25,
  },
  text: {
    fontSize: 17,
  },
  image: {
    width: 50,
    height: 50,
    padding: 50,
    marginRight: 20,
    // margin: 20,
    alignSelf: "flex-start",
    borderRadius: 10,
  },
  imageContainer: {
    justifyContent: "center",
  },
});
