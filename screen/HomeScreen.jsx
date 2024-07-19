import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SpeechBubble from "../components-common/SpeechBubble";
import { useState } from "react";

export default function HomeScreen() {
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

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.item, { backgroundColor }]}
    >
      <SpeechBubble textColor={{ textColor }} content={item.title} />
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#94D35C" : "#ffffff";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
