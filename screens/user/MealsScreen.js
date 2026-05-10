import React, { useEffect, useState } from "react";

import {
    View,
    Text,
    FlatList,
    StyleSheet,
} from "react-native";

import { getKitchenMeals } from "../../api/kitchenApi";
import ScreenWrapper from "../../components/ScreenWrapper";
import MealCard from "../../components/MealCard";
import { useCart } from "../../context/CartContext";
import AppButton from "../../components/AppButton";


export default function MealsScreen({
    route,
    navigation,
}) {
    const { kitchenId, kitchenName } =
        route.params;
    const {
        addToCart,
        cartItems,
        increaseQuantity,
        decreaseQuantity,
    } = useCart();
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

    const renderMeal = ({ item }) => {

        const cartItem =
            cartItems.find(
                (cart) =>
                    cart.id === item.id
            );

        return (
            <MealCard
                meal={item}

                cartQuantity={
                    cartItem?.quantity || 0
                }

                onAddToCart={() =>
                    addToCart(item)
                }

                onIncrease={() =>
                    increaseQuantity(
                        item.id
                    )
                }

                onDecrease={() =>
                    decreaseQuantity(
                        item.id
                    )
                }
            />
        );
    };
    return (
        <ScreenWrapper>
            <Text style={styles.title}>
                {kitchenName}
            </Text>
            <AppButton
                title="Go To Cart"
                onPress={() =>
                    navigation.navigate("Cart")
                }
            />
            <FlatList
                data={meals}
                keyExtractor={(item) => item.id}
                renderItem={renderMeal}
            />
        </ScreenWrapper>
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



    name: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },

    type: {
        color: "#666",
        marginBottom: 5,
    },


});