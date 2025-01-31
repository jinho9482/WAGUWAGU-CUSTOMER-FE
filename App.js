import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import SearchScreen from "./screen/SearchScreen";
import OrderHistoryScreen from "./screen/OrderHistoryScreen";
import MypageScreen from "./screen/MypageScreen";
import HomeScreen from "./screen/HomeScreen";
import LoginScreen from "./screen/LoginScreen";
import SignupScreen from "./screen/SignupScreen";

import StoreListScreen from "./screen/StoreListScreen";
import OrderScreen from "./screen/OrderScreen";
import CartScreen from "./screen/CartScreen";
import MenuDetailScreen from "./screen/MenuDetailScreen";
import KaKaoLoginScreen from "./screen/KaKaoLoginScreen";

export default function App() {
    const BottomTab = createMaterialBottomTabNavigator();
    const Stack = createStackNavigator();

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
                    <BottomTab.Screen
                        name="장바구니"
                        component={CartScreen}
                        options={{
                            tabBarLabel: "장바구니",
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
                        name="메뉴"
                        component={MenuDetailScreen}
                        options={{
                            tabBarLabel: "메뉴 상세",
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

    return (
        <NavigationContainer>
            <View style={styles.container}></View>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="MypageScreen" component={MypageScreen} />
                <Stack.Screen
                    name="OrderHistoryScreen"
                    component={OrderHistoryScreen}
                />
                <Stack.Screen name="SearchScreen" component={SearchScreen} />
                <Stack.Screen name="StoreList" component={StoreListScreen} />
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
                <Stack.Screen
                    name="Mycart"
                    component={CartScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="KaKaoLoginScreen" // 여기에서 KaKaoLoginScreen을 추가합니다.
                    component={KaKaoLoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SignupScreen"
                    component={SignupScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
  };

const styles = StyleSheet.create({
    container: {
        flex: 0.02,
        padding: 16,
        backgroundColor: "#94D35C",
        alignItems: "center",
        justifyContent: "center",
    },
});