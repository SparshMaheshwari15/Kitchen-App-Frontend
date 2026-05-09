import React, { useEffect, useState } from "react";

import {
    View,
    Text,
    FlatList,
    StyleSheet,
} from "react-native";

import { getKitchenOrders } from "../../api/orderApi";

export default function OrdersScreen() {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const data =
                await getKitchenOrders();

            setOrders(data);
        } catch (error) {
            console.log(
                "ORDER ERROR:",
                error.message
            );
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const renderOrder = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.orderId}>
                Order #{item.id.slice(0, 6)}
            </Text>

            <Text style={styles.user}>
                Customer: {item.user.name}
            </Text>

            <Text style={styles.address}>
                {item.deliveryAddress}
            </Text>

            <Text style={styles.status}>
                {item.status}
            </Text>

            <Text style={styles.total}>
                ₹{item.total}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={renderOrder}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 15,
    },

    card: {
        backgroundColor: "#f5f5f5",
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
    },

    orderId: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 5,
    },

    user: {
        marginBottom: 5,
    },

    address: {
        color: "#666",
        marginBottom: 5,
    },

    status: {
        color: "#ff7a00",
        fontWeight: "bold",
        marginBottom: 5,
    },

    total: {
        fontSize: 18,
        fontWeight: "bold",
    },
});