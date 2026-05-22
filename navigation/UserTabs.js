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

import HomeScreen from "../screens/user/HomeScreen";

import MealsScreen from "../screens/user/MealsScreen";

import CartScreen from "../screens/user/CartScreen";

import AddressScreen from "../screens/user/AddressScreen";

import MyOrdersScreen from "../screens/user/MyOrdersScreen";

import ProfileScreen from "../screens/user/ProfileScreen";
import KitchenRegistrationScreen from "../screens/user/KitchenRegistrationScreen";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function HomeStack() {

    return (

        <Stack.Navigator>

            <Stack.Screen
                name="HomeScreen"
                component={
                    HomeScreen
                }

                options={{
                    title: "Home",
                }}
            />

            <Stack.Screen
                name="Meals"
                component={
                    MealsScreen
                }
            />

        </Stack.Navigator>
    );
}

function ProfileStack() {

    return (

        <Stack.Navigator>

            <Stack.Screen
                name="ProfileMain"
                component={ProfileScreen}
                options={{
                    title: "Profile",
                }}
            />

            <Stack.Screen
                name="MyOrders"
                component={MyOrdersScreen}
            />

            <Stack.Screen
                name="Address"
                component={AddressScreen}
            />

            <Stack.Screen
                name="KitchenRegistration"
                component={
                    KitchenRegistrationScreen
                }
            />

        </Stack.Navigator>
    );
}

export default function UserTabs() {

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
                name="Home"

                component={
                    HomeStack
                }

                options={{
                    tabBarIcon: ({
                        color,
                        size,
                    }) => (

                        <Ionicons
                            name="home"
                            size={size}
                            color={color}
                        />

                    ),
                }}
            />

            <Tab.Screen
                name="Cart"

                component={
                    CartScreen
                }

                options={{
                    tabBarIcon: ({
                        color,
                        size,
                    }) => (

                        <Ionicons
                            name="cart"
                            size={size}
                            color={color}
                        />

                    ),
                }}
            />

            <Tab.Screen
                name="Profile"

                component={
                    ProfileStack
                }

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