import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/user/HomeScreen";
import MealsScreen from "../screens/user/MealsScreen";

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
        </Stack.Navigator>
    );
}