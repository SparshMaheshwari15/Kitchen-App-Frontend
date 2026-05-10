import React from "react";

import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";

import AppButton from "./AppButton";

import { COLORS } from "../theme/colors";

export default function MealCard({
    meal,
    onAddToCart,
    onIncrease,
    onDecrease,
    cartQuantity,
}) {
    return (
        <View style={styles.card}>

            <Image
                source={{
                    uri: "https://images.unsplash.com/photo-1544025162-d76694265947",
                }}
                style={styles.image}
            />

            <View style={styles.content}>

                <View style={styles.topRow}>
                    <Text style={styles.name}>
                        {meal.name}
                    </Text>

                    <View
                        style={[
                            styles.badge,

                            meal.type === "VEG" &&
                            styles.vegBadge,

                            meal.type === "EGG" &&
                            styles.eggBadge,

                            meal.type ===
                            "NON_VEG" &&
                            styles.nonVegBadge,
                        ]}
                    >
                        <Text style={styles.badgeText}>
                            {meal.type}
                        </Text>
                    </View>
                </View>

                <Text style={styles.description}>
                    {meal.description ||
                        "Fresh homemade delicious meal"}
                </Text>

                <View style={styles.bottomRow}>

                    <View>
                        <Text style={styles.price}>
                            ₹{meal.price}
                        </Text>

                        <Text style={styles.quantity}>
                            {meal.quantity} Available
                        </Text>
                    </View>

                    <View style={styles.buttonContainer}>

                        {
                            cartQuantity > 0 ? (

                                <View style={styles.quantityContainer}>

                                    <TouchableOpacity
                                        style={styles.qtyButton}
                                        onPress={onDecrease}
                                    >
                                        <Text style={styles.qtyText}>
                                            -
                                        </Text>
                                    </TouchableOpacity>

                                    <Text style={styles.quantityText}>
                                        {cartQuantity}
                                    </Text>

                                    <TouchableOpacity
                                        style={styles.qtyButton}
                                        onPress={onIncrease}
                                    >
                                        <Text style={styles.qtyText}>
                                            +
                                        </Text>
                                    </TouchableOpacity>

                                </View>

                            ) : (

                                <AppButton
                                    title="Add"
                                    onPress={onAddToCart}
                                />

                            )
                        }

                    </View>

                </View>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 22,
        overflow: "hidden",
        marginBottom: 22,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.08,
        shadowRadius: 10,

        elevation: 5,
    },

    image: {
        width: "100%",
        height: 180,
    },

    content: {
        padding: 18,
    },

    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },

    name: {
        fontSize: 22,
        fontWeight: "700",
        color: COLORS.text,
        flex: 1,
        marginRight: 10,
    },

    badge: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
    },

    vegBadge: {
        backgroundColor: "#D4F8D4",
    },

    eggBadge: {
        backgroundColor: "#FFF0C7",
    },

    nonVegBadge: {
        backgroundColor: "#FFD6D6",
    },

    badgeText: {
        fontSize: 11,
        fontWeight: "700",
    },

    description: {
        color: COLORS.subText,
        lineHeight: 20,
        marginBottom: 18,
    },

    bottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    price: {
        fontSize: 24,
        fontWeight: "bold",
        color: COLORS.primary,
        marginBottom: 5,
    },

    quantity: {
        color: COLORS.subText,
        fontSize: 13,
    },

    buttonContainer: {
        width: 110,
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF2E8",
        borderRadius: 14,
        paddingHorizontal: 10,
        paddingVertical: 6,
    },

    qtyButton: {
        backgroundColor: "#FF6B00",
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },

    qtyText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },

    quantityText: {
        marginHorizontal: 14,
        fontSize: 16,
        fontWeight: "700",
    },
});