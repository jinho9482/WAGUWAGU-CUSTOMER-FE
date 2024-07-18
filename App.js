import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchScreen from "./screen/SearchScreen";
import OrderHistoryScreen from "./screen/OrderHistoryScreen";
import MypageScreen from "./screen/MypageScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function App() {
  const BottomTab = createBottomTabNavigator();
  return (
    // <View style={styles.container}>
    <NavigationContainer>
      <BottomTab.Navigator
        screenOptions={{ tabBarActiveBackgroundColor: "#94D35C" }}
      >
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
      </BottomTab.Navigator>
    </NavigationContainer>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
