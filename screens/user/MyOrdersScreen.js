import React, {
    useEffect,
    useState,
} from "react";

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native";

import ScreenWrapper from "../../components/ScreenWrapper";

import {
    getMyOrders,
} from "../../api/orderApi";

import {
    submitRating,
} from "../../api/ratingApi";

import { COLORS } from "../../theme/colors";

export default function MyOrdersScreen() {

    const [orders, setOrders] =
        useState([]);

    const fetchOrders =
        async () => {

            try {

                const data =
                    await getMyOrders();

                setOrders(data);

            } catch (error) {

                console.log(
                    error.response?.data ||
                    error.message
                );
            }
        };

    useEffect(() => {
        fetchOrders();
    }, []);

    const pendingOrders =
        orders.filter(
            (order) =>
                order.status !==
                "DELIVERED"
        );

    const deliveredOrders =
        orders.filter(
            (order) =>
                order.status ===
                "DELIVERED"
        );

    const handleRating =
        async (
            orderId,
            value
        ) => {

            try {

                await submitRating({
                    orderId,
                    value,
                });

                Alert.alert(
                    "Success",
                    "Rating Submitted"
                );

            } catch (error) {

                console.log(
                    error.response?.data ||
                    error.message
                );
            }
        };

    const renderOrder = (
        order,
        showRating = false
    ) => (
        <View
            key={order.id}
            style={styles.card}
        >

            <View style={styles.topRow}>

                <Text style={styles.kitchen}>
                    {
                        order.kitchen
                            ?.name
                    }
                </Text>

                <View
                    style={[
                        styles.statusBadge,

                        order.status ===
                            "DELIVERED"
                            ? styles.delivered
                            : styles.pending,
                    ]}
                >
                    <Text
                        style={
                            styles.statusText
                        }
                    >
                        {order.status}
                    </Text>
                </View>

            </View>

            <Text style={styles.address}>
                📍{" "}
                {
                    order.deliveryAddress
                }
            </Text>

            <View style={styles.itemsContainer}>
                {
                    order.items.map(
                        (item) => (
                            <Text
                                key={
                                    item.id
                                }
                                style={
                                    styles.item
                                }
                            >
                                •{" "}
                                {
                                    item
                                        .meal
                                        ?.name
                                }{" "}
                                ×{" "}
                                {
                                    item.quantity
                                }
                            </Text>
                        )
                    )
                }
            </View>

            <Text style={styles.total}>
                ₹{order.total}
            </Text>

            {
                showRating && (
                    <View
                        style={
                            styles.ratingRow
                        }
                    >

                        {
                            [1, 2, 3, 4, 5].map(
                                (
                                    value
                                ) => (
                                    <TouchableOpacity
                                        key={
                                            value
                                        }
                                        onPress={() =>
                                            handleRating(
                                                order.id,
                                                value
                                            )
                                        }
                                    >
                                        <Text
                                            style={
                                                styles.star
                                            }
                                        >
                                            ⭐
                                        </Text>
                                    </TouchableOpacity>
                                )
                            )
                        }

                    </View>
                )
            }

        </View>
    );

    return (
        <ScreenWrapper>

            <ScrollView
                showsVerticalScrollIndicator={
                    false
                }
            >

                <Text style={styles.heading}>
                    Pending Orders
                </Text>

                {
                    pendingOrders.map(
                        (order) =>
                            renderOrder(
                                order
                            )
                    )
                }

                <Text style={styles.heading}>
                    Delivered Orders
                </Text>

                {
                    deliveredOrders.map(
                        (order) =>
                            renderOrder(
                                order,
                                true
                            )
                    )
                }

            </ScrollView>

        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
        marginTop: 10,
        color: COLORS.text,
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 22,
        padding: 18,
        marginBottom: 20,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.06,
        shadowRadius: 10,

        elevation: 4,
    },

    topRow: {
        flexDirection: "row",
        justifyContent:
            "space-between",
        alignItems: "center",
        marginBottom: 12,
    },

    kitchen: {
        fontSize: 20,
        fontWeight: "700",
        color: COLORS.text,
        flex: 1,
    },

    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },

    pending: {
        backgroundColor: "#FFF3D6",
    },

    delivered: {
        backgroundColor: "#D4F8D4",
    },

    statusText: {
        fontWeight: "700",
        fontSize: 12,
    },

    address: {
        color: COLORS.subText,
        marginBottom: 15,
    },

    itemsContainer: {
        marginBottom: 15,
    },

    item: {
        marginBottom: 5,
        color: COLORS.text,
    },

    total: {
        fontSize: 24,
        fontWeight: "bold",
        color: COLORS.primary,
    },

    ratingRow: {
        flexDirection: "row",
        marginTop: 18,
    },

    star: {
        fontSize: 28,
        marginRight: 8,
    },
});