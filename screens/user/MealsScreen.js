import React, { useEffect, useState } from "react";

import {
    View,
    Text,
    FlatList,
    StyleSheet,
} from "react-native";

import { getKitchenMeals } from "../../api/kitchenApi";

export default function MealsScreen({
    route,
}) {
    const { kitchenId, kitchenName } =
        route.params;

    const [meals, setMeals] = useState([]);

    const fetchMeals = async () => {
        try {
            const data = await getKitchenMeals(
                kitchenId
            );

            setMeals(data);
        } catch (error) {
            console.log(
                "MEALS ERROR:",
                error.message
            );
        }
    };

    useEffect(() => {
        fetchMeals();
    }, []);

    const renderMeal = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.name}>
                {item.name}
            </Text>

            <Text style={styles.type}>
                {item.type}
            </Text>

            <Text style={styles.price}>
                ₹{item.price}
            </Text>

            <Text style={styles.quantity}>
                Available: {item.quantity}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {kitchenName}
            </Text>

            <FlatList
                data={meals}
                keyExtractor={(item) => item.id}
                renderItem={renderMeal}
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

    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },

    card: {
        backgroundColor: "#f5f5f5",
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
    },

    name: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },

    type: {
        color: "#666",
        marginBottom: 5,
    },

    price: {
        color: "#ff7a00",
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 5,
    },

    quantity: {
        color: "#444",
    },
});