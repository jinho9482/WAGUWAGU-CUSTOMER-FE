import React from "react";
import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

export default function SearchStoreListSpeechBubble(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={[
          styles.container,
          { width: props.width },
          { backgroundColor: props.backgroundColor },
        ]}
      >
        <View style={styles.imageContainer}>
          <Image
            style={[styles.image, { resizeMode: "contain" }]}
            source={
              props.image
                ? {
                    uri:
                      "https://storage.googleapis.com/wgwg_bucket/" + props.image,
                  }
                : require("./../assets/food icon.png")
            }
          />
        </View>
        <View style={styles.textContainer}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.textTitle}>
            {props.title}
          </Text>
          <Text style={styles.text}>{props.time}</Text>
          <Text style={styles.text}>{props.storeMinimumOrderAmount}</Text>
          <Text style={styles.text}>{props.fee}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

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
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  textTitle: {
    fontSize: 40,
    paddingBottom: 15,
  },
  text: {
    fontSize: 20,
  },
  image: {
    width: 40,
    height: 40,
    padding: 50,
    marginRight: 10,
    alignSelf: "flex-start",
    borderRadius: 10,
  },
  imageContainer: {
    justifyContent: "center",
  },
});
