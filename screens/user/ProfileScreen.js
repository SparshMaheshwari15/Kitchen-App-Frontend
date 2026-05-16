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

export default function ProfileScreen({
    navigation,
}) {

    const { logout, isGuest } =
        useAuth();

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
                Profile
            </Text>

            <View style={styles.card}>

                {
                    isGuest ? (

                        <AppButton
                            title="Login"

                            onPress={() =>
                                navigation.navigate(
                                    "Login"
                                )
                            }
                        />

                    ) : (

                        <>

                            <AppButton
                                title="My Orders"

                                onPress={() =>
                                    navigation.navigate(
                                        "MyOrders"
                                    )
                                }
                            />

                            <View style={styles.spacing} />

                            <AppButton
                                title="Saved Addresses"

                                onPress={() =>
                                    navigation.navigate(
                                        "Address"
                                    )
                                }
                            />

                            <View style={styles.spacing} />

                            <AppButton
                                title="Logout"

                                type="secondary"

                                onPress={
                                    handleLogout
                                }
                            />

                        </>

                    )
                }

            </View>

        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({

    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 30,
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
        shadowOpacity: 0.05,
        shadowRadius: 8,

        elevation: 3,
    },

    spacing: {
        height: 16,
    },
});