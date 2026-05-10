import React, { useState } from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";

import { createMeal } from "../../api/mealApi";
import ScreenWrapper from "../../components/ScreenWrapper";
import AppButton from "../../components/AppButton";
import TypeButton from "../../components/TypeButton";
export default function CreateMealScreen() {
    const [name, setName] =
        useState("");

    const [description, setDescription] =
        useState("");

    const [price, setPrice] =
        useState("");

    const [quantity, setQuantity] =
        useState("");

    const [type, setType] =
        useState("VEG");

    const handleCreateMeal =
        async () => {
            try {
                await createMeal({
                    name,
                    description,
                    price: Number(price),
                    quantity: Number(quantity),
                    type,
                });

                Alert.alert(
                    "Success",
                    "Meal Created"
                );

                setName("");
                setDescription("");
                setPrice("");
                setQuantity("");
            } catch (error) {
                console.log(
                    "CREATE MEAL ERROR:",
                    error.response?.data || error.message
                );
            }
        };

    return (
        <ScreenWrapper>
            <Text style={styles.title}>
                Create Meal
            </Text>

            <TextInput
                placeholder="Meal Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />

            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
            />

            <TextInput
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                style={styles.input}
            />

            <TextInput
                placeholder="Quantity"
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
                style={styles.input}
            />

            <View style={styles.typeRow}>

                <TypeButton
                    title="VEG"
                    active={type === "VEG"}
                    onPress={() =>
                        setType("VEG")
                    }
                />

                <TypeButton
                    title="EGG"
                    active={type === "EGG"}
                    onPress={() =>
                        setType("EGG")
                    }
                />

                <TypeButton
                    title="NON VEG"
                    active={type === "NON_VEG"}
                    onPress={() =>
                        setType("NON_VEG")
                    }
                />

            </View>

            <AppButton
                title="Create Meal"
                onPress={handleCreateMeal}
            >
                <Text style={styles.buttonText}>
                    Create Meal
                </Text>
            </AppButton>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
    },

    typeRow: {
        flexDirection: "row",
        marginBottom: 20,
    },

    typeButton: {
        flex: 1,
        padding: 15,
        backgroundColor: "#eee",
        marginRight: 10,
        borderRadius: 10,
        alignItems: "center",
    },

    activeType: {
        backgroundColor: "#ff7a00",
    },

    button: {
        backgroundColor: "#222",
        padding: 15,
        borderRadius: 10,
    },

    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
    },
});