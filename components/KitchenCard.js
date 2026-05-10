import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
} from "react-native";

import { COLORS } from "../theme/colors";

export default function KitchenCard({
    kitchen,
    onPress,
}) {
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
        >
            <Image
                source={{
                    uri: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
                }}
                style={styles.image}
            />

            <View style={styles.content}>
                <Text style={styles.name}>
                    {kitchen.name}
                </Text>

                <Text style={styles.address}>
                    {kitchen.address}
                </Text>

                <Text style={styles.price}>
                    Starting ₹
                    {kitchen.cheapestPrice}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 18,
        overflow: "hidden",
        marginBottom: 20,

        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 8,

        elevation: 4,
    },

    image: {
        width: "100%",
        height: 170,
    },

    content: {
        padding: 15,
    },

    name: {
        fontSize: 20,
        fontWeight: "700",
        color: COLORS.text,
        marginBottom: 5,
    },

    address: {
        color: COLORS.subText,
        marginBottom: 10,
    },

    price: {
        color: COLORS.primary,
        fontWeight: "700",
        fontSize: 16,
    },
});