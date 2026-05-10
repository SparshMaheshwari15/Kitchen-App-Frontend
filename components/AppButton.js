import React from "react";

import {
    TouchableOpacity,
    Text,
    StyleSheet,
} from "react-native";

import { COLORS } from "../theme/colors";

export default function AppButton({
    title,
    onPress,
    type = "primary",
}) {
    return (
        <TouchableOpacity
            style={[
                styles.button,

                type === "secondary" &&
                styles.secondaryButton,
            ]}
            onPress={onPress}
        >
            <Text style={styles.text}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 15,
        borderRadius: 14,
        alignItems: "center",
        marginBottom: 15,
    },

    secondaryButton: {
        backgroundColor: COLORS.secondary,
    },

    text: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "600",
    },
});