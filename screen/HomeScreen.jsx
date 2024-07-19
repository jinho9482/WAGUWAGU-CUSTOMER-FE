import {
  Dimensions,
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
  const dimensionWidth = Dimensions.get("window").width / 4;
  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item]}>
      <SpeechBubble
        width={dimensionWidth}
        textColor={{ textColor }}
        content={item.title}
        backgroundColor={backgroundColor}
      />
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
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        flexShrink: 1,
      }}
    >
      {/* <ScrollView> */}
      {DATA.map((item) => {
        const backgroundColor = item.id === selectedId ? "#94D35C" : "#ffffff";
        const color = item.id === selectedId ? "white" : "black";
        return (
          <Item
            key={item.id}
            item={item}
            onPress={() => setSelectedId(item.id)}
            backgroundColor={backgroundColor}
            textColor={color}
          />
        );
      })}
      {/* </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
