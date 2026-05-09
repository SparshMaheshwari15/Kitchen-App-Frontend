import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import DashboardScreen from "../screens/kitchen/DashboardScreen";
import OrdersScreen from "../screens/kitchen/OrdersScreen";
import CreateMealScreen from "../screens/kitchen/CreateMealScreen";

const Tab = createBottomTabNavigator();

export default function KitchenTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Dashboard"
                component={DashboardScreen}
            />

            <Tab.Screen
                name="Orders"
                component={OrdersScreen}
            />

            <Tab.Screen
                name="Create Meal"
                component={CreateMealScreen}
            />
        </Tab.Navigator>
    );
}