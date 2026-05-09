import React, { useState } from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

export default function LoginScreen({
    navigation,
}) {
    const [phone, setPhone] =
        useState("+9198");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Home Chef
            </Text>

            <TextInput
                placeholder="Enter Phone Number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                style={styles.input}
            />

            <TouchableOpacity
                style={styles.userButton}
                onPress={() =>
                    navigation.replace("UserTabs")
                }
            >
                <Text style={styles.buttonText}>
                    Login as User
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.kitchenButton}
                onPress={() =>
                    navigation.replace(
                        "KitchenTabs"
                    )
                }
            >
                <Text style={styles.buttonText}>
                    Login as Kitchen
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#fff",
    },

    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 40,
    },

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
    },

    userButton: {
        backgroundColor: "#ff7a00",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },

    kitchenButton: {
        backgroundColor: "#222",
        padding: 15,
        borderRadius: 10,
    },

    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,
    },
});