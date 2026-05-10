import React from "react";

import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import { COLORS } from "../theme/colors";

export default function OrderCard({
    order,
}) {
    return (
        <View style={styles.card}>
            <Text style={styles.orderId}>
                Order #
                {order.id.slice(0, 6)}
            </Text>

            <Text style={styles.customer}>
                {order.user?.name ||
                    "Customer"}
            </Text>

            <Text style={styles.address}>
                {order.deliveryAddress}
            </Text>

            <View style={styles.row}>
                <Text style={styles.status}>
                    {order.status}
                </Text>

                <Text style={styles.total}>
                    ₹{order.total}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 18,
        padding: 18,
        marginBottom: 18,

        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 8,

        elevation: 4,
    },

    orderId: {
        fontSize: 18,
        fontWeight: "700",
        color: COLORS.text,
        marginBottom: 8,
    },

    customer: {
        fontSize: 16,
        marginBottom: 5,
    },

    address: {
        color: COLORS.subText,
        marginBottom: 15,
    },

    row: {
        flexDirection: "row",
        justifyContent:
            "space-between",
        alignItems: "center",
    },

    status: {
        color: COLORS.primary,
        fontWeight: "700",
    },

    total: {
        fontSize: 20,
        fontWeight: "700",
        color: COLORS.text,
    },
});