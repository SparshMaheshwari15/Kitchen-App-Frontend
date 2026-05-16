import React from "react";

import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import ScreenWrapper from "../../components/ScreenWrapper";

import AppButton from "../../components/AppButton";

import {
    useAuth,
} from "../../context/AuthContext";

export default function KitchenProfileScreen({
    navigation,
}) {

    const {
        logout,
        user,
    } = useAuth();

    const handleLogout =
        async () => {

            await logout();

            navigation.replace(
                "Login"
            );
        };

    return (
        <ScreenWrapper>

            <Text style={styles.title}>
                Kitchen Profile
            </Text>

            <View style={styles.card}>

                <Text style={styles.phone}>
                    {user?.phone}({user?.name})
                </Text>

                <View style={styles.spacing} />

                <AppButton
                    title="Manage Meals"

                    onPress={() =>
                        navigation.navigate(
                            "MealsManagement"
                        )
                    }
                />

                <View style={styles.spacing} />

                <AppButton
                    title="Create Meal"

                    onPress={() =>
                        navigation.navigate(
                            "CreateMeal"
                        )
                    }
                />

                <View style={styles.spacing} />

                <AppButton
                    title="Logout"

                    type="secondary"

                    onPress={handleLogout}
                />

            </View>

        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({

    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 25,
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.06,
        shadowRadius: 8,

        elevation: 3,
    },

    spacing: {
        height: 16,
    },

    phone: {
        fontSize: 16,
        color: "#666",
        marginBottom: 10,
    },
});