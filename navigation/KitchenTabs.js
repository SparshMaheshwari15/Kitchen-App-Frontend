import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import DashboardScreen from "../screens/kitchen/DashboardScreen";

const Tab = createBottomTabNavigator();

export default function KitchenTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Dashboard"
                component={DashboardScreen}
            />
        </Tab.Navigator>
    );
}