import React, {
    useState,
} from "react";

import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    Alert,
} from "react-native";

import * as Location from "expo-location";

import ScreenWrapper from "../../components/ScreenWrapper";

import AppButton from "../../components/AppButton";

import CameraCaptureCard from "../../components/CameraCaptureCard";

import {
    registerKitchen,
} from "../../api/kitchenApi";

export default function KitchenRegistrationScreen() {

    const [name, setName] =
        useState("");

    const [address, setAddress] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [aadharCard,
        setAadharCard] =
        useState(null);

    const [panCard,
        setPanCard] =
        useState(null);

    const [ownerPhoto,
        setOwnerPhoto] =
        useState(null);

    const [kitchenPhotos,
        setKitchenPhotos] =
        useState([]);

    const addKitchenPhoto =
        (photo) => {

            setKitchenPhotos(
                (prev) => [
                    ...prev,
                    photo,
                ]
            );
        };

    const handleSubmit =
        async () => {

            try {

                if (
                    !name ||
                    !address ||
                    !aadharCard ||
                    !panCard ||
                    !ownerPhoto
                ) {

                    Alert.alert(
                        "All fields are required"
                    );

                    return;
                }

                setLoading(true);

                const permission =
                    await Location.requestForegroundPermissionsAsync();

                if (
                    permission.status !==
                    "granted"
                ) {

                    Alert.alert(
                        "Location permission required"
                    );

                    return;
                }

                const location =
                    await Location.getCurrentPositionAsync({});

                const formData =
                    new FormData();

                formData.append(
                    "name",
                    name
                );

                formData.append(
                    "address",
                    address
                );

                formData.append(
                    "latitude",
                    String(
                        location.coords.latitude
                    )
                );

                formData.append(
                    "longitude",
                    String(
                        location.coords.longitude
                    )
                );

                formData.append(
                    "aadharCard",
                    {
                        uri:
                            aadharCard.uri,

                        name:
                            "aadhar.jpg",

                        type:
                            "image/jpeg",
                    }
                );

                formData.append(
                    "panCard",
                    {
                        uri:
                            panCard.uri,

                        name:
                            "pan.jpg",

                        type:
                            "image/jpeg",
                    }
                );

                formData.append(
                    "ownerPhoto",
                    {
                        uri:
                            ownerPhoto.uri,

                        name:
                            "owner.jpg",

                        type:
                            "image/jpeg",
                    }
                );

                kitchenPhotos.forEach(
                    (
                        photo,
                        index
                    ) => {

                        formData.append(
                            "kitchenPhotos",
                            {
                                uri:
                                    photo.uri,

                                name:
                                    `kitchen-${index}.jpg`,

                                type:
                                    "image/jpeg",
                            }
                        );
                    }
                );

                await registerKitchen(
                    formData
                );

                Alert.alert(
                    "Success",
                    "Kitchen registration submitted"
                );

            } catch (error) {

                console.log(
                    error.response?.data ||
                    error.message
                );

                Alert.alert(
                    "Registration Failed"
                );

            } finally {

                setLoading(false);
            }
        };

    return (
        <ScreenWrapper>

            <ScrollView
                showsVerticalScrollIndicator={
                    false
                }
            >

                <Text style={styles.title}>
                    Become a Kitchen 👨‍🍳
                </Text>

                <TextInput
                    placeholder="Kitchen Name"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                />

                <TextInput
                    placeholder="Address"
                    value={address}
                    onChangeText={setAddress}
                    style={styles.input}
                />

                <CameraCaptureCard
                    title="Aadhaar Card"
                    image={aadharCard}
                    onCapture={
                        setAadharCard
                    }
                />

                <CameraCaptureCard
                    title="PAN Card"
                    image={panCard}
                    onCapture={
                        setPanCard
                    }
                />

                <CameraCaptureCard
                    title="Owner Photo"
                    image={ownerPhoto}
                    onCapture={
                        setOwnerPhoto
                    }
                />

                <CameraCaptureCard
                    title="Kitchen Photo 1"
                    image={
                        kitchenPhotos[0]
                    }
                    onCapture={
                        addKitchenPhoto
                    }
                />

                <CameraCaptureCard
                    title="Kitchen Photo 2"
                    image={
                        kitchenPhotos[1]
                    }
                    onCapture={
                        addKitchenPhoto
                    }
                />

                <AppButton
                    title={
                        loading
                            ? "Submitting..."
                            : "Submit Registration"
                    }

                    onPress={
                        handleSubmit
                    }
                />

            </ScrollView>

        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({

    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 24,
    },

    input: {
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 16,
        marginBottom: 18,
        fontSize: 16,
    },
});