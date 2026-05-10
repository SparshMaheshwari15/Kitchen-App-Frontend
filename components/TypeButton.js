import React from "react";

import {
    TouchableOpacity,
    Text,
    StyleSheet,
} from "react-native";

import { COLORS } from "../theme/colors";

export default function TypeButton({
    title,
    active,
    onPress,
}) {
    return (
        <TouchableOpacity
            style={[
                styles.button,

                active &&
                styles.activeButton,
            ]}
            onPress={onPress}
        >
            <Text
                style={[
                    styles.text,

                    active &&
                    styles.activeText,
                ]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        backgroundColor: "#F2F2F2",
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: "center",
        marginRight: 10,
    },

    activeButton: {
        backgroundColor:
            COLORS.primary,
    },

    text: {
        color: COLORS.text,
        fontWeight: "600",
    },

    activeText: {
        color: COLORS.white,
    },
});