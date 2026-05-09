import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/auth/LoginScreen";
import UserTabs from "./UserTabs";
import KitchenTabs from "./KitchenTabs";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="UserTabs"
                component={UserTabs}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="KitchenTabs"
                component={KitchenTabs}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}