import React, {
    useEffect,
    useState,
} from "react";

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from "react-native";

import ScreenWrapper from "../../components/ScreenWrapper";

import {
    getKitchenOrders,
} from "../../api/orderApi";

import {
    getMyMeals,
} from "../../api/mealApi";

import { COLORS } from "../../theme/colors";

export default function DashboardScreen() {

    const [stats, setStats] =
        useState({
            activeOrders: 0,
            pendingOrders: 0,
            deliveredOrders: 0,
            meals: 0,
        });

    const loadDashboard =
        async () => {

            try {

                const pending =
                    await getKitchenOrders(
                        "PENDING"
                    );

                const active =
                    await getKitchenOrders(
                        "ACTIVE"
                    );

                const history =
                    await getKitchenOrders(
                        "HISTORY"
                    );

                const meals =
                    await getMyMeals();

                const deliveredOrders =
                    history.filter(
                        (order) =>
                            order.status ===
                            "DELIVERED"
                    );

                setStats({
                    activeOrders:
                        active.length,

                    pendingOrders:
                        pending.length,

                    deliveredOrders:
                        deliveredOrders.length,

                    meals:
                        meals.length,
                });

            } catch (error) {

                console.log(
                    error.response?.data ||
                    error.message
                );
            }
        };

    useEffect(() => {

        loadDashboard();

    }, []);

    return (
        <ScreenWrapper>

            <ScrollView
                showsVerticalScrollIndicator={false}
            >

                <Text style={styles.heading}>
                    Kitchen Dashboard 👨‍🍳
                </Text>

                <View style={styles.grid}>

                    <View style={styles.card}>
                        <Text style={styles.number}>
                            {stats.pendingOrders}
                        </Text>

                        <Text style={styles.label}>
                            Pending Orders
                        </Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.number}>
                            {stats.activeOrders}
                        </Text>

                        <Text style={styles.label}>
                            Active Orders
                        </Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.number}>
                            {stats.deliveredOrders}
                        </Text>

                        <Text style={styles.label}>
                            Delivered Orders
                        </Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.number}>
                            {stats.meals}
                        </Text>

                        <Text style={styles.label}>
                            Total Meals
                        </Text>
                    </View>

                </View>

            </ScrollView>

        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({

    heading: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 25,
        color: COLORS.text,
    },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    card: {
        width: "48%",
        backgroundColor: "#fff",
        borderRadius: 22,
        paddingVertical: 28,
        paddingHorizontal: 16,
        marginBottom: 18,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.06,
        shadowRadius: 10,

        elevation: 4,
    },

    number: {
        fontSize: 34,
        fontWeight: "bold",
        color: COLORS.primary,
        marginBottom: 10,
    },

    label: {
        fontSize: 15,
        color: COLORS.subText,
        fontWeight: "600",
    },
});