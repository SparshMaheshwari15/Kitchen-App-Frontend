import React, { useState } from "react";

import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

import ScreenWrapper from "../../components/ScreenWrapper";

import AppButton from "../../components/AppButton";

import { useCart } from "../../context/CartContext";

import { COLORS } from "../../theme/colors";

import { Alert } from "react-native";

import { createOrder } from "../../api/orderApi";
import {
    useAuth,
} from "../../context/AuthContext";

export default function CartScreen({
    navigation }) {
    const { isGuest } =
        useAuth();
    const {
        cartItems,
        removeFromCart,
        getTotal,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
    } = useCart();

    const [selectedAddress,
        setSelectedAddress] =
        useState(null);
    const renderItem = ({
        item,
    }) => (
        <View style={styles.card}>

            <View>
                <Text style={styles.name}>
                    {item.name}
                </Text>

                <Text style={styles.price}>
                    ₹{item.price}
                </Text>
            </View>

            <View style={styles.rightSection}>

                <View style={styles.quantityContainer}>

                    <TouchableOpacity
                        style={styles.qtyButton}
                        onPress={() =>
                            decreaseQuantity(
                                item.id
                            )
                        }
                    >
                        <Text style={styles.qtyText}>
                            -
                        </Text>
                    </TouchableOpacity>

                    <Text style={styles.quantityText}>
                        {item.quantity}
                    </Text>

                    <TouchableOpacity
                        style={styles.qtyButton}
                        onPress={() =>
                            increaseQuantity(
                                item.id
                            )
                        }
                    >
                        <Text style={styles.qtyText}>
                            +
                        </Text>
                    </TouchableOpacity>

                </View>

                <TouchableOpacity
                    onPress={() =>
                        removeFromCart(item.id)
                    }
                >
                    <Text style={styles.removeText}>
                        Remove
                    </Text>
                </TouchableOpacity>

            </View>

        </View>
    );
    const handlePlaceOrder = async () => {
        if (isGuest) {

            Alert.alert(
                "Login Required",
                "Please login to place an order",
                [
                    {
                        text: "Cancel",
                        style: "cancel",
                    },

                    {
                        text: "Login",

                        onPress: () =>
                            navigation.navigate(
                                "Login", {
                                redirectTo: "Cart",
                            }
                            ),
                    },
                ]
            );

            return;
        }
        try {

            const kitchenId =
                cartItems[0].kitchenId;
            if (!selectedAddress) {

                Alert.alert(
                    "Select Address",
                    "Please select delivery address"
                );

                return;
            }
            const orderData = {
                kitchenId,

                addressId:
                    selectedAddress.id,

                items: cartItems.map(
                    (item) => ({
                        mealId: item.id,
                        quantity:
                            item.quantity,
                    })
                ),
            };

            await createOrder(orderData);

            // clearCart();

            Alert.alert(
                "Success",
                "Order Placed Successfully",
                [
                    {
                        text: "OK",

                        onPress: () => {

                            clearCart();

                            navigation.navigate(
                                "Home"
                            );
                        },
                    },
                ]
            );
        } catch (error) {

            console.log(
                "ORDER ERROR:",
                error.response?.data ||
                error.message
            );
        }
    };
    return (
        <ScreenWrapper>

            <Text style={styles.title}>
                Your Cart
            </Text>

            {
                cartItems.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                            Cart is Empty
                        </Text>
                    </View>
                ) : (
                    <>
                        <FlatList
                            data={cartItems}
                            keyExtractor={(item) =>
                                item.id
                            }
                            renderItem={renderItem}
                            showsVerticalScrollIndicator={
                                false
                            }
                        />

                        {!isGuest && (
                            <AppButton
                                title={
                                    selectedAddress
                                        ? selectedAddress.label
                                        : "Select Address"
                                }

                                onPress={() =>
                                    navigation.navigate(
                                        "Address",
                                        {
                                            onSelectAddress:
                                                setSelectedAddress,
                                        }
                                    )
                                }
                            />
                        )}
                        <View style={styles.footer}>

                            <Text style={styles.total}>
                                Total: ₹
                                {getTotal()}
                            </Text>

                            <AppButton
                                title="Place Order"
                                onPress={() =>
                                    handlePlaceOrder()
                                }
                            />

                        </View>
                    </>
                )
            }

        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: COLORS.text,
        marginBottom: 20,
    },

    card: {
        backgroundColor: COLORS.white,
        borderRadius: 18,
        padding: 18,
        marginBottom: 18,

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.08,
        shadowRadius: 8,

        elevation: 4,
    },

    name: {
        fontSize: 18,
        fontWeight: "700",
        color: COLORS.text,
        marginBottom: 6,
    },

    price: {
        color: COLORS.primary,
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 4,
    },

    quantity: {
        color: COLORS.subText,
    },

    buttonContainer: {
        width: 110,
    },

    footer: {
        marginTop: 10,
        paddingTop: 20,
        borderTopWidth: 1,
        borderColor: "#eee",
    },

    total: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 15,
        color: COLORS.text,
    },

    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    emptyText: {
        fontSize: 18,
        color: COLORS.subText,
    },
    rightSection: {
        alignItems: "center",
    },

    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF2E8",
        borderRadius: 14,
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginBottom: 10,
    },

    qtyButton: {
        backgroundColor: "#FF6B00",
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },

    qtyText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },

    quantityText: {
        marginHorizontal: 12,
        fontSize: 16,
        fontWeight: "700",
    },

    removeText: {
        color: "#E74C3C",
        fontWeight: "600",
    },
});