import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { View, StyleSheet, Text } from "react-native";

import HomeScreen from "./screen/HomeScreen";
import SearchScreen from "./screen/SearchScreen";
import OrderHistoryScreen from "./screen/OrderHistoryScreen";
import MypageScreen from "./screen/MypageScreen";
import OrderScreen from "./screen/OrderScreen";
import LoginScreen from "./screen/LoginScreen";
import SignupScreen from "./screen/SignupScreen";

const Stack = createStackNavigator();
const BottomTab = createMaterialBottomTabNavigator();

const BottomView = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}></View>
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
              <MaterialCommunityIcons name="home" color={color} size={20} />
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
                color={color}
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
                color={color}
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
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account-circle"
                color={color}
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
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account-circle"
                color={color}
                size={20}
              />
            ),
          }}
        />
      </BottomTab.Navigator>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Mypage"
          component={MypageScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
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
