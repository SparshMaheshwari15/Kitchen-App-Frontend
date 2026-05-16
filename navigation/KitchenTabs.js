import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import DashboardScreen from "../screens/kitchen/DashboardScreen";
import OrdersScreen from "../screens/kitchen/OrdersScreen";
import CreateMealScreen from "../screens/kitchen/CreateMealScreen";
import MealsManagementScreen from "../screens/kitchen/MealsManagementScreen";

import {
    Ionicons,
} from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

export default function KitchenTabs() {
    return (
        <Tab.Navigator screenOptions={{
            // headerShown: false,

            tabBarActiveTintColor:
                "#FF6B00",

            tabBarInactiveTintColor:
                "#888",

            tabBarStyle: {
                // height: 70,
                paddingBottom: 10,
                paddingTop: 10,
            },
        }}>
            <Tab.Screen
                name="Dashboard"
                component={DashboardScreen}

                options={{
                    tabBarIcon: ({
                        color,
                        size,
                    }) => (
                        <Ionicons
                            name="grid"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="Orders"
                component={OrdersScreen}

                options={{
                    tabBarIcon: ({
                        color,
                        size,
                    }) => (
                        <Ionicons
                            name="receipt"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="CreateMeal"
                component={CreateMealScreen}

                options={{
                    title: "Create Meal",

                    tabBarIcon: ({
                        color,
                        size,
                    }) => (
                        <Ionicons
                            name="restaurant"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="Meals"
                component={MealsManagementScreen}

                options={{
                    tabBarIcon: ({
                        color,
                        size,
                    }) => (
                        <Ionicons
                            name="fast-food"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}