import React, { useState, useEffect } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { Searchbar } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { searchByKeyword, createStore, deleteByCustomerId } from "../config/serchApi";
import { getAllStoresNearUserNoCategoryQL, getAllMenuByStoreIdQL } from "../config/storeGraphQL";
import { UserInformation } from "../config/orderApi";

export default function SearchScreen({ navigation }) {
  const [keywordQuery, setKeywordQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = async (type, reset = false) => {
    try {
      setLoading(true);
      const pageable = {
        page: reset ? 0 : page,
        size: 10,
      };

      let data = [];
      if (type === "keyword") {
        data = await searchByKeyword(keywordQuery, pageable);
      }

      if (reset) {
        setResults(data);
        setPage(1);
      } else {
        setResults((prevResults) => [...prevResults, ...data]);
        setPage((prevPage) => prevPage + 1);
      }

      setTotalPages(Math.ceil(data.total / pageable.size));
    } catch (error) {
      console.error(`${type} search failed:`, error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreResults = () => {
    if (page < totalPages && !loading) {
      handleSearch("keyword");
    }
  };

  const saveStore = async () => {
    try {
      setLoading(true);

      const userInfo = await UserInformation();
      console.log("User Information:", userInfo);

      const storesNearUser = await getAllStoresNearUserNoCategoryQL({
        input: {
          longitude: userInfo.customerLongitude,
          latitude: userInfo.customerLatitude,
        },
      });
      console.log("Stores near user:", storesNearUser);

      for (const store of storesNearUser) {
        const menuDetail = await getAllMenuByStoreIdQL({
          input: {
            storeId: store.storeId,
          },
        });

        const storeData = {
          storeId: store.storeId,
          customerId: userInfo.customerId,
          storeName: store.storeName,
          storeIntroduction: store.storeIntroduction,
          menuName: menuDetail?.menuName || "Default Menu Name",
          menuIntroduction: menuDetail?.menuIntroduction || "Default Menu Introduction",
        };

        try {
          const response = await createStore(storeData);
          console.log("Store saved successfully:", response);
        } catch (error) {
          console.error("Failed to save store:", error);
        }
      }

      handleSearch("keyword", true);
    } catch (error) {
      console.error("Failed to save stores:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleItemPress = async (storeId) => {
    try {
      const userInfo = await UserInformation();
      await deleteByCustomerId(userInfo.customerId);
      console.log("Store deleted successfully for customer ID:", userInfo.customerId);
    } catch (error) {
      console.error("Failed to delete store by customer ID:", error);
    }

    navigation.navigate("Store", { storeId });
  };

  useFocusEffect(
    React.useCallback(() => {
      saveStore();
    }, [])
  );

  useEffect(() => {
    return () => {
      const deleteStoreByCustomerId = async () => {
        try {
          const userInfo = await UserInformation();
          await deleteByCustomerId(userInfo.customerId);
          console.log("Store deleted successfully for customer ID:", userInfo.customerId);
        } catch (error) {
          console.error("Failed to delete store by customer ID:", error);
        }
      };

      deleteStoreByCustomerId();
    };
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>검색 및 저장</Text>

      {/* Searchbar */}
      <Searchbar
        placeholder="Keyword를 입력하세요"
        value={keywordQuery}
        onChangeText={(text) => {
          setKeywordQuery(text);
          setPage(0);
        }}
        onSubmitEditing={() => handleSearch("keyword", true)} // Trigger search on submit
        style={{ marginBottom: 20 }}
      />

      {loading && <Text>Loading...</Text>}

      <FlatList
        data={results}
        keyExtractor={(item) => (item.storeId !== null ? item.storeId.toString() : Math.random().toString())}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.storeId}
            onPress={() => handleItemPress(item.storeId)}
          >
            <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
              <Text>가게 ID: {item.storeId}</Text>
              <Text>가게 이름: {item.storeName}</Text>
              <Text>소개: {item.storeIntroduction}</Text>
              <Text>메뉴 이름: {item.menuName}</Text>
              <Text>메뉴 소개: {item.menuIntroduction}</Text>
            </View>
          </TouchableOpacity>
        )}
        onEndReached={loadMoreResults}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}
