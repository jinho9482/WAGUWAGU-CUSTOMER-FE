import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchScreen from "./screen/SearchScreen";
import OrderHistoryScreen from "./screen/OrderHistoryScreen";
import MypageScreen from "./screen/MypageScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "./screen/HomeScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import OrderScreen from "./screen/OrderScreen";

export default function App() {
  const BottomTab = createMaterialBottomTabNavigator();

  const BottomView = () => {
    return (
      <BottomTab.Navigator
        initialRouteName="Home"
        activeColor="#f0edf6"
        barStyle={{ backgroundColor: "#94D35C" }}
      >
        <BottomTab.Screen
          name="홈"
          component={HomeScreen}
          options={{
            tabBarLabel: "홈",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={"#000000"} size={20} />
            ),
          }}
        />
        <BottomTab.Screen
          name="검색"
          component={SearchScreen}
          options={{
            tabBarLabel: "검색",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="file-search-outline"
                color={"#000000"}
                size={20}
              />
            ),
          }}
        />

        <BottomTab.Screen
          name="주문내역"
          component={OrderHistoryScreen}
          options={{
            tabBarLabel: "주문내역",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="text-box-outline"
                color={"#000000"}
                size={20}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="마이페이지"
          component={MypageScreen}
          options={{
            tabBarLabel: "마이페이지",
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name="account-circle"
                color={"#000000"}
                size={20}
              />
            ),
          }}
        />
                <BottomTab.Screen
          name="주문하기"
          component={OrderScreen}
          options={{
            tabBarLabel: "주문",
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name="account-circle"
                color={"#000000"}
                size={20}
              />
            ),
          }}
        />
      </BottomTab.Navigator>
      
    );
  };

  return (
    <NavigationContainer>
      <View style={styles.container}></View>
      <BottomView />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.02,
    padding: 16,
    backgroundColor: "#94D35C",
    alignItems: "center",
    justifyContent: "center",
  },
});
