import React, {
    useEffect,
    useState,
} from "react";

import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from "react-native";

import ScreenWrapper from "../../components/ScreenWrapper";

import {
    getKitchenOrders,
    updateOrderStatus,
} from "../../api/orderApi";

import { COLORS } from "../../theme/colors";

export default function OrdersScreen() {

    const [orders, setOrders] =
        useState([]);

    const [selectedTab,
        setSelectedTab] =
        useState("ACTIVE");

    const fetchOrders =
        async () => {

            try {

                const data =
                    await getKitchenOrders(
                        selectedTab
                    );

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
    }, [selectedTab]);

    const handleStatusUpdate =
        async (
            orderId,
            status
        ) => {

            try {

                await updateOrderStatus(
                    orderId,
                    status
                );

                Alert.alert(
                    "Success",
                    `Order marked ${status}`
                );

                fetchOrders();

            } catch (error) {

                console.log(
                    error.response?.data ||
                    error.message
                );
            }
        };

    const getNextStatus =
        (status) => {

            switch (status) {

                case "PENDING":
                    return "ACCEPTED";

                case "ACCEPTED":
                    return "PREPARING";

                case "PREPARING":
                    return "READY";

                case "READY":
                    return "OUT_FOR_DELIVERY";

                case "OUT_FOR_DELIVERY":
                    return "DELIVERED";

                default:
                    return null;
            }
        };
    const getActionLabel =
        (status) => {

            switch (status) {

                case "ACCEPTED":
                    return "Start Preparing";

                case "PREPARING":
                    return "Mark Ready";

                case "READY":
                    return "Send For Delivery";

                case "OUT_FOR_DELIVERY":
                    return "Mark Delivered";

                default:
                    return "Update";
            }
        };
    return (
        <ScreenWrapper>

            <Text style={styles.heading}>
                Orders
            </Text>

            <View style={styles.tabs}>
                <TouchableOpacity
                    style={[
                        styles.tabButton,

                        selectedTab ===
                        "PENDING" &&
                        styles.activeTab,
                    ]}
                    onPress={() =>
                        setSelectedTab(
                            "PENDING"
                        )
                    }
                >
                    <Text style={styles.tabText}>
                        Pending
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.tabButton,

                        selectedTab ===
                        "ACTIVE" &&
                        styles.activeTab,
                    ]}
                    onPress={() =>
                        setSelectedTab(
                            "ACTIVE"
                        )
                    }
                >
                    <Text
                        style={
                            styles.tabText
                        }
                    >
                        Active
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.tabButton,

                        selectedTab ===
                        "HISTORY" &&
                        styles.activeTab,
                    ]}
                    onPress={() =>
                        setSelectedTab(
                            "HISTORY"
                        )
                    }
                >
                    <Text
                        style={
                            styles.tabText
                        }
                    >
                        History
                    </Text>
                </TouchableOpacity>

            </View>

            <ScrollView
                showsVerticalScrollIndicator={
                    false
                }
            >
                {
                    orders.length === 0 ? (

                        <View style={styles.emptyContainer}>

                            <Text style={styles.emptyEmoji}>
                                🍽️
                            </Text>

                            <Text style={styles.emptyTitle}>
                                No Orders Found
                            </Text>

                            <Text style={styles.emptySubtitle}>
                                Orders will appear here once customers place them.
                            </Text>

                        </View>

                    ) : (

                        <ScrollView
                            showsVerticalScrollIndicator={
                                false
                            }
                        >

                            {
                                orders.map(
                                    (order) => {

                                        const nextStatus =
                                            getNextStatus(
                                                order.status
                                            );

                                        return (
                                            <View
                                                key={
                                                    order.id
                                                }
                                                style={
                                                    styles.card
                                                }
                                            >

                                                <View
                                                    style={
                                                        styles.topRow
                                                    }
                                                >

                                                    <Text
                                                        style={
                                                            styles.orderId
                                                        }
                                                    >
                                                        #
                                                        {
                                                            order.id.slice(
                                                                0,
                                                                6
                                                            )
                                                        }
                                                    </Text>

                                                    <View
                                                        style={[
                                                            styles.statusBadge,
                                                        ]}
                                                    >
                                                        <Text
                                                            style={
                                                                styles.statusText
                                                            }
                                                        >
                                                            {
                                                                order.status
                                                            }
                                                        </Text>
                                                    </View>

                                                </View>

                                                <View
                                                    style={
                                                        styles.itemsContainer
                                                    }
                                                >

                                                    {
                                                        order.items.map(
                                                            (
                                                                item
                                                            ) => (
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

                                                <Text
                                                    style={
                                                        styles.total
                                                    }
                                                >
                                                    ₹
                                                    {
                                                        order.total
                                                    }
                                                </Text>

                                                {
                                                    selectedTab ===
                                                        "PENDING" ? (

                                                        <View style={styles.actionRow}>

                                                            <TouchableOpacity
                                                                style={styles.acceptButton}
                                                                onPress={() =>
                                                                    handleStatusUpdate(
                                                                        order.id,
                                                                        "ACCEPTED"
                                                                    )
                                                                }
                                                            >
                                                                <Text style={styles.actionText}>
                                                                    Accept
                                                                </Text>
                                                            </TouchableOpacity>

                                                            <TouchableOpacity
                                                                style={styles.cancelButton}
                                                                onPress={() =>
                                                                    handleStatusUpdate(
                                                                        order.id,
                                                                        "CANCELLED"
                                                                    )
                                                                }
                                                            >
                                                                <Text style={styles.actionText}>
                                                                    Cancel
                                                                </Text>
                                                            </TouchableOpacity>

                                                        </View>

                                                    ) : (

                                                        nextStatus &&
                                                        selectedTab !==
                                                        "HISTORY" && (

                                                            <TouchableOpacity
                                                                style={
                                                                    styles.actionButton
                                                                }
                                                                onPress={() =>
                                                                    handleStatusUpdate(
                                                                        order.id,
                                                                        nextStatus
                                                                    )
                                                                }
                                                            >
                                                                <Text
                                                                    style={
                                                                        styles.actionText
                                                                    }
                                                                >
                                                                    {
                                                                        getActionLabel(
                                                                            order.status
                                                                        )
                                                                    }
                                                                </Text>
                                                            </TouchableOpacity>

                                                        )

                                                    )
                                                }

                                            </View>
                                        );
                                    }
                                )
                            }

                        </ScrollView>

                    )
                }
            </ScrollView>

        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
        color: COLORS.text,
    },

    tabs: {
        flexDirection: "row",
        marginBottom: 20,
    },

    tabButton: {
        flex: 1,
        backgroundColor: "#eee",
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: "center",
        marginRight: 10,
    },

    activeTab: {
        backgroundColor: COLORS.primary,
    },
    tabText: {
        color: "#222",
        fontWeight: "700",
    },
    activeTabText: {
        color: "#fff",
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
        marginBottom: 14,
    },

    orderId: {
        fontSize: 18,
        fontWeight: "700",
    },

    statusBadge: {
        backgroundColor: "#FFF2E8",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },

    statusText: {
        color: COLORS.primary,
        fontWeight: "700",
        fontSize: 12,
    },

    address: {
        color: COLORS.subText,
        marginBottom: 16,
    },

    itemsContainer: {
        marginBottom: 16,
    },

    item: {
        marginBottom: 5,
    },

    total: {
        fontSize: 24,
        fontWeight: "bold",
        color: COLORS.primary,
        marginBottom: 18,
    },

    acceptButton: {
        flex: 1,
        backgroundColor: "#27AE60",
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        minHeight: 50,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: "#C0392B",
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        minHeight: 50,
    },
    actionButton: {
        backgroundColor: "#FF6B00",
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        minHeight: 50,
        marginTop: 10,
    },
    actionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 15,
    },

    actionText: {
        color: "#fff",
        fontWeight: "700",
    },

    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 120,
    },

    emptyEmoji: {
        fontSize: 70,
        marginBottom: 20,
    },

    emptyTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: COLORS.text,
        marginBottom: 10,
    },

    emptySubtitle: {
        color: COLORS.subText,
        textAlign: "center",
        lineHeight: 22,
        paddingHorizontal: 40,
    },
});