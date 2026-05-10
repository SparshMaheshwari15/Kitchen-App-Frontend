import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/user/HomeScreen";
import MealsScreen from "../screens/user/MealsScreen";
import CartScreen from "../screens/user/CartScreen";
import AddressScreen from "../screens/user/AddressScreen";
import MyOrdersScreen from "../screens/user/MyOrdersScreen";

const Stack = createNativeStackNavigator();

export default function UserTabs() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
            />

            <Stack.Screen
                name="Meals"
                component={MealsScreen}
            />

            <Stack.Screen
                name="Cart"
                component={CartScreen}
            />

            <Stack.Screen
                name="Address"
                component={AddressScreen}
            />

            <Stack.Screen
                name="MyOrders"
                component={MyOrdersScreen}
            />
        </Stack.Navigator>
    );
}