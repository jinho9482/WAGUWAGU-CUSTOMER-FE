import React, { useState } from "react";
import { Text, View, TextInput, Button, FlatList } from "react-native";
import { searchStore, searchMenu, searchByKeyword } from "../config/serchApi";

export default function SearchScreen() {
  const [storeQuery, setStoreQuery] = useState("");
  const [menuQuery, setMenuQuery] = useState("");
  const [keywordQuery, setKeywordQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0); // Current page number
  const [totalPages, setTotalPages] = useState(1); // Total pages available

  const handleSearch = async (type, reset = false) => {
    try {
      setLoading(true);
      const pageable = {
        page: reset ? 0 : page,
        size: 10,
      };
      let data;
      if (type === "store") {
        data = await searchStore(storeQuery, pageable);
      } else if (type === "menu") {
        data = await searchMenu(menuQuery, pageable);
      } else if (type === "keyword") {
        data = await searchByKeyword(keywordQuery, pageable);
      }

      if (reset) {
        setResults(data); // Reset results for new search
      } else {
        setResults([...results, ...data]); // Append new results for pagination
      }

      setTotalPages(data.totalPages); // Update total pages
      setPage(page + 1); // Move to the next page
    } catch (error) {
      console.error(`${type} search failed:`, error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreResults = () => {
    if (page < totalPages && !loading) {
      handleSearch("store");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>검색</Text>

      {/* Keyword Search */}
      <View style={{ marginBottom: 20 }}>
        <Text>Keyword Search</Text>
        <TextInput
          placeholder="Keyword를 입력하세요"
          value={keywordQuery}
          onChangeText={setKeywordQuery}
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        />
        <Button title="Keyword 검색" onPress={() => handleSearch("keyword", true)} />
      </View>

      {loading && <Text>Loading...</Text>}

      <FlatList
        data={results}
        keyExtractor={(item) => item.storeId.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <Text>가게 ID: {item.storeId}</Text>
            <Text>가게 이름: {item.storeName}</Text>
            <Text>소개: {item.storeIntroduction}</Text>
            <Text>메뉴 이름: {item.menuName}</Text>
            <Text>메뉴 소개: {item.menuIntroduction}</Text>
          </View>
        )}
        onEndReached={loadMoreResults} 
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}
