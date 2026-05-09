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
                    price,
                    quantity,
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
                    error.message
                );
            }
        };

    return (
        <View style={styles.container}>
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
                <TouchableOpacity
                    style={[
                        styles.typeButton,
                        type === "VEG" &&
                        styles.activeType,
                    ]}
                    onPress={() => setType("VEG")}
                >
                    <Text>VEG</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.typeButton,
                        type === "EGG" &&
                        styles.activeType,
                    ]}
                    onPress={() => setType("EGG")}
                >
                    <Text>EGG</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.typeButton,
                        type === "NON_VEG" &&
                        styles.activeType,
                    ]}
                    onPress={() =>
                        setType("NON_VEG")
                    }
                >
                    <Text>NON VEG</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={handleCreateMeal}
            >
                <Text style={styles.buttonText}>
                    Create Meal
                </Text>
            </TouchableOpacity>
        </View>
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