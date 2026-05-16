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
    TextInput,
} from "react-native";

import ScreenWrapper from "../../components/ScreenWrapper";

import {
    getMyMeals,
    deleteMeal,
    toggleMealAvailability,
    updateMeal,
} from "../../api/mealApi";

import { COLORS } from "../../theme/colors";

export default function MealsManagementScreen() {

    const [meals, setMeals] =
        useState([]);

    const [editingMealId,
        setEditingMealId] =
        useState(null);

    const [quantity,
        setQuantity] =
        useState("");

    const fetchMeals =
        async () => {

            try {

                const data =
                    await getMyMeals();

                setMeals(data);

            } catch (error) {

                console.log(
                    error.response?.data ||
                    error.message
                );
            }
        };

    useEffect(() => {
        fetchMeals();
    }, []);

    const handleDelete =
        async (mealId) => {

            try {

                await deleteMeal(
                    mealId
                );

                fetchMeals();

            } catch (error) {

                console.log(
                    error.response?.data ||
                    error.message
                );
            }
        };

    const handleToggle =
        async (
            mealId,
            currentValue
        ) => {

            try {

                await toggleMealAvailability(
                    mealId,
                    !currentValue
                );

                fetchMeals();

            } catch (error) {

                console.log(
                    error.response?.data ||
                    error.message
                );
            }
        };

    const handleQuantityUpdate =
        async (
            meal
        ) => {

            try {

                await updateMeal(
                    meal.id,
                    {
                        quantity:
                            Number(
                                quantity
                            ),
                    }
                );

                setEditingMealId(
                    null
                );

                setQuantity("");

                fetchMeals();

            } catch (error) {

                console.log(
                    error.response?.data ||
                    error.message
                );
            }
        };

    return (
        <ScreenWrapper>

            <Text style={styles.heading}>
                Your Meals
            </Text>

            <ScrollView
                showsVerticalScrollIndicator={
                    false
                }
            >

                {
                    meals.map(
                        (meal) => (

                            <View
                                key={meal.id}
                                style={styles.card}
                            >

                                <View style={styles.topRow}>

                                    <View style={{ flex: 1 }}>

                                        <Text style={styles.name}>
                                            {meal.name}
                                        </Text>

                                        <Text style={styles.type}>
                                            {meal.type}
                                        </Text>

                                    </View>

                                    <View
                                        style={[
                                            styles.badge,

                                            meal.isAvailable
                                                ? styles.available
                                                : styles.unavailable,
                                        ]}
                                    >
                                        <Text style={styles.badgeText}>
                                            {
                                                meal.isAvailable
                                                    ? "Available"
                                                    : "Unavailable"
                                            }
                                        </Text>
                                    </View>

                                </View>

                                <Text style={styles.price}>
                                    ₹{meal.price}
                                </Text>

                                {
                                    editingMealId ===
                                        meal.id ? (

                                        <View style={styles.editRow}>

                                            <TextInput
                                                value={quantity}
                                                onChangeText={
                                                    setQuantity
                                                }
                                                keyboardType="number-pad"
                                                placeholder="Qty"
                                                style={styles.input}
                                            />

                                            <TouchableOpacity
                                                style={styles.saveButton}
                                                onPress={() =>
                                                    handleQuantityUpdate(
                                                        meal
                                                    )
                                                }
                                            >
                                                <Text style={styles.actionText}>
                                                    Save
                                                </Text>
                                            </TouchableOpacity>

                                        </View>

                                    ) : (

                                        <Text style={styles.quantity}>
                                            Qty: {meal.quantity}
                                        </Text>

                                    )
                                }

                                <View style={styles.actions}>

                                    <TouchableOpacity
                                        style={styles.editButton}
                                        onPress={() => {

                                            setEditingMealId(
                                                meal.id
                                            );

                                            setQuantity(
                                                String(
                                                    meal.quantity
                                                )
                                            );
                                        }}
                                    >
                                        <Text style={styles.actionText}>
                                            Edit Qty
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.toggleButton}
                                        onPress={() =>
                                            handleToggle(
                                                meal.id,
                                                meal.isAvailable
                                            )
                                        }
                                    >
                                        <Text style={styles.actionText}>
                                            {
                                                meal.isAvailable
                                                    ? "Disable"
                                                    : "Enable"
                                            }
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.deleteButton}
                                        onPress={() =>
                                            handleDelete(
                                                meal.id
                                            )
                                        }
                                    >
                                        <Text style={styles.actionText}>
                                            Delete
                                        </Text>
                                    </TouchableOpacity>

                                </View>

                            </View>
                        )
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
        marginBottom: 12,
    },

    name: {
        fontSize: 20,
        fontWeight: "700",
        color: COLORS.text,
    },

    type: {
        color: COLORS.subText,
        marginTop: 4,
    },

    price: {
        fontSize: 24,
        fontWeight: "bold",
        color: COLORS.primary,
        marginBottom: 10,
    },

    quantity: {
        fontSize: 16,
        marginBottom: 18,
    },

    badge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },

    available: {
        backgroundColor: "#D4F8D4",
    },

    unavailable: {
        backgroundColor: "#FFD6D6",
    },

    badgeText: {
        fontWeight: "700",
        fontSize: 12,
    },

    actions: {
        flexDirection: "row",
        justifyContent:
            "space-between",
    },

    editButton: {
        flex: 1,
        backgroundColor: "#3498DB",
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center",
        marginRight: 6,
    },

    toggleButton: {
        flex: 1,
        backgroundColor: "#F39C12",
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center",
        marginRight: 6,
    },

    deleteButton: {
        flex: 1,
        backgroundColor: "#E74C3C",
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center",
    },

    actionText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 12,
    },

    editRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },

    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginRight: 10,
    },

    saveButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 12,
    },
});