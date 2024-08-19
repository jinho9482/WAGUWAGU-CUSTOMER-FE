import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SpeechBubble from "../components-common/SpeechBubble";
import React, { useState } from "react";
import { Searchbar } from "react-native-paper";

export default function HomeScreen({ navigation }) {
  const DATA = [
    {
      id: "1",
      title: "한식",
    },
    {
      id: "2",
      title: "양식",
    },
    {
      id: "3",
      title: "일식",
    },
    {
      id: "4",
      title: "중식",
    },
    {
      id: "5",
      title: "피자",
    },
    {
      id: "6",
      title: "치킨",
    },
    {
      id: "7",
      title: "회",
    },
    {
      id: "8",
      title: "디저트",
    },
    {
      id: "9",
      title: "기타",
    },
  ];
  const [selectedId, setSelectedId] = useState();
  const dimensionWidth = Dimensions.get("window").width / 4.3;
  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item]}>
      <SpeechBubble
        height={80}
        width={dimensionWidth}
        textColor={{ textColor }}
        content={item.title}
        backgroundColor={backgroundColor}
      />
    </TouchableOpacity>
  );

  const Search = () => {
    const [searchQuery, setSearchQuery] = React.useState("");

    return (
      <Searchbar
        style={styles.search}
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
    );
  };

  return (
    <ScrollView>
      <View>
        <Image
          style={[styles.image, { resizeMode: "contain" }]}
          source={require("./../assets/waguwagu.png")}
        />

        <Search />
        {/* <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            flexShrink: 1,
          }}
        > */}
        <View style={styles.categoryContainer}>
          {DATA.map((item) => {
            const backgroundColor =
              item.id === selectedId ? "#94D35C" : "#ffffff";
            const color = item.id === selectedId ? "white" : "black";
            return (
              <Item
                key={item.id}
                item={item}
                onPress={() => {
                  setSelectedId(item.id);
                  navigation.navigate("StoreList", { category: item.title });
                }}
                backgroundColor={backgroundColor}
                textColor={color}
              />
            );
          })}
        </View>
        <Pressable onPress={() => navigation.navigate("ReviewScreen")}>
          <Text>리뷰</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  item: {
    // padding: 20,
    // flex: 1,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  image: {
    width: Dimensions.get("window").width - 50,
    height: 150,
    padding: 50,
    alignSelf: "center",
  },
  search: {
    margin: 20,
  },
});
