import React from "react";

import {
    createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import {
    createNativeStackNavigator,
} from "@react-navigation/native-stack";

import {
    Ionicons,
} from "@expo/vector-icons";

import DashboardScreen from "../screens/kitchen/DashboardScreen";

import OrdersScreen from "../screens/kitchen/OrdersScreen";

import MealsManagementScreen from "../screens/kitchen/MealsManagementScreen";

import CreateMealScreen from "../screens/kitchen/CreateMealScreen";

import KitchenProfileScreen from "../screens/kitchen/KitchenProfileScreen";

const Tab =
    createBottomTabNavigator();

const Stack =
    createNativeStackNavigator();

function ProfileStack() {

    return (

        <Stack.Navigator>

            <Stack.Screen
                name="KitchenProfile"
                component={KitchenProfileScreen}

                options={{
                    title: "Profile",
                }}
            />

            <Stack.Screen
                name="MealsManagement"
                component={MealsManagementScreen}

                options={{
                    title: "Manage Meals",
                }}
            />

            <Stack.Screen
                name="CreateMeal"
                component={CreateMealScreen}

                options={{
                    title: "Create Meal",
                }}
            />

        </Stack.Navigator>
    );
}

export default function KitchenTabs() {

    return (

        <Tab.Navigator

            screenOptions={{
                headerShown: false,

                tabBarActiveTintColor:
                    "#FF6B00",

                tabBarInactiveTintColor:
                    "#888",
            }}
        >

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
                name="Profile"
                component={ProfileStack}

                options={{
                    tabBarIcon: ({
                        color,
                        size,
                    }) => (

                        <Ionicons
                            name="person"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

        </Tab.Navigator>
    );
}