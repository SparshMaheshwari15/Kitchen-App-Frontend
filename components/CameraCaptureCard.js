import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

export default function CameraCaptureCard({
    title,
    image,
    onCapture,
}) {

    const handleCapture =
        async () => {

            const permission =
                await ImagePicker.requestCameraPermissionsAsync();

            if (
                permission.status !==
                "granted"
            ) {
                return;
            }

            const result =
                await ImagePicker.launchCameraAsync({
                    mediaTypes:
                        ImagePicker.MediaTypeOptions.Images,

                    quality: 0.7,
                });

            if (
                !result.canceled
            ) {

                onCapture(
                    result.assets[0]
                );
            }
        };

    return (
        <View style={styles.card}>

            <Text style={styles.title}>
                {title}
            </Text>

            {
                image ? (

                    <Image
                        source={{
                            uri:
                                image.uri,
                        }}
                        style={styles.image}
                    />

                ) : (

                    <View style={styles.placeholder}>
                        <Text>
                            No Image
                        </Text>
                    </View>

                )
            }

            <TouchableOpacity
                style={styles.button}
                onPress={
                    handleCapture
                }
            >
                <Text style={styles.buttonText}>

                    {
                        image
                            ? "Retake"
                            : "Capture"
                    }

                </Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({

    card: {
        backgroundColor: "#fff",
        borderRadius: 18,
        padding: 16,
        marginBottom: 20,
    },

    title: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 12,
    },

    image: {
        width: "100%",
        height: 180,
        borderRadius: 12,
        marginBottom: 12,
    },

    placeholder: {
        height: 180,
        borderRadius: 12,
        backgroundColor: "#eee",

        justifyContent: "center",
        alignItems: "center",

        marginBottom: 12,
    },

    button: {
        backgroundColor: "#FF6B00",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
    },

    buttonText: {
        color: "#fff",
        fontWeight: "700",
    },
});