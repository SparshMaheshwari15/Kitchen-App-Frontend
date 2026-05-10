import React from "react";

import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import ScreenWrapper from "../../components/ScreenWrapper";

import AppButton from "../../components/AppButton";

import { COLORS } from "../../theme/colors";

export default function DashboardScreen({
    navigation,
}) {

    return (
        <ScreenWrapper>

            <View style={styles.header}>

                <Text style={styles.title}>
                    👨‍🍳 Kitchen Dashboard
                </Text>

                <Text style={styles.subtitle}>
                    Manage meals and orders
                </Text>

            </View>

            <View style={styles.content}>

                <View style={styles.card}>

                    <Text style={styles.cardTitle}>
                        Welcome Back
                    </Text>

                    <Text style={styles.cardText}>
                        Start managing your kitchen operations.
                    </Text>

                </View>

            </View>

            <AppButton
                title="Logout"
                type="secondary"
                onPress={() =>
                    navigation.replace(
                        "Login"
                    )
                }
            />

        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    header: {
        marginTop: 10,
        marginBottom: 30,
    },

    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: COLORS.text,
        marginBottom: 8,
    },

    subtitle: {
        color: COLORS.subText,
        fontSize: 16,
    },

    content: {
        flex: 1,
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 24,
        padding: 24,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.06,
        shadowRadius: 10,

        elevation: 4,
    },

    cardTitle: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 10,
        color: COLORS.text,
    },

    cardText: {
        color: COLORS.subText,
        lineHeight: 22,
    },
});