import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GlobalStyles } from "../constants/styles";
import Screen_AllExpenses from "../screens/Screen_AllExpenses";
import Screen_ManageExpense from "../screens/Screen_ManageExpense";
import Screen_RecentExpenses from "../screens/Screen_RecentExpenses";
import linking, { RootBottomTabs, RootStackParamList } from "./LinkingConfiguration";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../components/UI/IconButton";
import { Platform } from "react-native";
import { E_ManageExpenseScreenModes } from "../types";

export default function Navigation() {
  return (
    <NavigationContainer linking={linking}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();
function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
      }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name="Screen_ManageExpense"
        component={Screen_ManageExpense}
        options={{
          presentation: "modal" /* //! nothing special happens in android. ios only */,
        }}
      />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootBottomTabs>();
function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={({ navigation }: { navigation: NativeStackNavigationProp<RootStackParamList> }) => {
        return {
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: "white",
          tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          tabBarActiveTintColor: GlobalStyles.colors.accent500,
          headerRight: ({ tintColor }) => (
            <IconButton
              name="add"
              size={24}
              color={tintColor!}
              onPress={() =>
                navigation.navigate("Screen_ManageExpense", {
                  mode: E_ManageExpenseScreenModes["Add Expense"],
                })
              }
            />
          ),
        };
      }}>
      <BottomTab.Screen
        name="Screen_RecentExpenses"
        component={Screen_RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="hourglass" size={size} color={color} />;
          },
        }}
      />
      <BottomTab.Screen
        name="Screen_AllExpenses"
        component={Screen_AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="calendar" size={size} color={color} />;
          },
        }}
      />
    </BottomTab.Navigator>
  );
}
