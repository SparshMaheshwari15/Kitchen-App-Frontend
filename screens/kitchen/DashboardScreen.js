import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DashboardScreen() {
    return (
        // <ScreenWrapper>
        //     <Text style={styles.text}>
        //         Kitchen Dashboard
        //     </Text>
        // </ScreenWrapper>
        <View className="flex-1 items-center justify-center bg-red-200">
            <Text className="text-3xl font-bold text-red-500">
                Tailwind Working
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    text: {
        fontSize: 22,
        fontWeight: "bold",
    },
});