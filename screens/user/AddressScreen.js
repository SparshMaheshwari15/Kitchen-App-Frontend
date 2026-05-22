import React, {
    useEffect,
    useState,
} from "react";

import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";

import ScreenWrapper from "../../components/ScreenWrapper";

import AppButton from "../../components/AppButton";

import {
    getMyAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
} from "../../api/addressApi";

import { COLORS } from "../../theme/colors";

import * as Location from "expo-location";

export default function AddressScreen({
    navigation,
    route,
}) {


    const [addresses, setAddresses] =
        useState([]);

    const [label, setLabel] =
        useState("");

    const [addressLine,
        setAddressLine] =
        useState("");

    const [editingAddressId,
        setEditingAddressId] =
        useState(null);

    const fetchAddresses =
        async () => {

            try {

                const data =
                    await getMyAddresses();

                setAddresses(data);

            } catch (error) {

                console.log(
                    error.response?.data ||
                    error.message
                );
            }
        };

    useEffect(() => {
        fetchAddresses();
    }, []);

    const handleAddAddress =
        async () => {

            try {

                let latitude = null;
                let longitude = null;

                try {

                    const { status } =
                        await Location.requestForegroundPermissionsAsync();

                    if (
                        status === "granted"
                    ) {

                        const location =
                            await Location.getCurrentPositionAsync({});

                        latitude =
                            location.coords.latitude;

                        longitude =
                            location.coords.longitude;
                    }

                } catch (locationError) {

                    console.log(
                        "LOCATION ERROR:",
                        locationError.message
                    );
                }

                const payload = {
                    label,
                    addressLine,
                    latitude,
                    longitude,
                };

                if (
                    editingAddressId
                ) {

                    await updateAddress(
                        editingAddressId,
                        payload
                    );

                    Alert.alert(
                        "Success",
                        "Address Updated"
                    );

                } else {

                    await addAddress(
                        payload
                    );

                    Alert.alert(
                        "Success",
                        "Address Added"
                    );
                }

                setLabel("");
                setAddressLine("");

                setEditingAddressId(
                    null
                );

                fetchAddresses();

            } catch (error) {

                console.log(
                    error.response?.data ||
                    error.message
                );
            }
        };

    const renderAddress = ({
        item,
    }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => {

                navigation.navigate(
                    "Cart",
                    {
                        selectedAddress:
                            item,
                    }
                );
            }}
        >

            <Text style={styles.label}>
                {item.label}
            </Text>

            <Text style={styles.address}>
                {item.addressLine}
            </Text>

            <View style={styles.actionRow}>

                <TouchableOpacity
                    onPress={() => {

                        setLabel(
                            item.label
                        );

                        setAddressLine(
                            item.addressLine
                        );

                        setEditingAddressId(
                            item.id
                        );
                    }}
                >
                    <Text style={styles.editText}>
                        Edit
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={async () => {

                        try {

                            await deleteAddress(
                                item.id
                            );

                            fetchAddresses();

                        } catch (error) {

                            console.log(
                                error.response?.data ||
                                error.message
                            );
                        }
                    }}
                >
                    <Text style={styles.deleteText}>
                        Delete
                    </Text>
                </TouchableOpacity>

            </View>

        </TouchableOpacity>
    );

    return (
        <ScreenWrapper>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={
                    Platform.OS === "ios"
                        ? "padding"
                        : "height"
                }
            >

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <Text style={styles.title}>
                        Your Addresses
                    </Text>

                    <View style={{ marginBottom: 20 }}>
                        {
                            addresses.map((item) => (
                                <View key={item.id}>
                                    {renderAddress({ item })}
                                </View>
                            ))
                        }
                    </View>

                    <View style={styles.form}>

                        <TextInput
                            placeholder="Label (Home)"
                            value={label}
                            onChangeText={setLabel}
                            style={styles.input}
                        />

                        <TextInput
                            placeholder="Address Line"
                            value={addressLine}
                            onChangeText={
                                setAddressLine
                            }
                            style={styles.input}
                        />

                        <AppButton
                            title="Add Address"
                            onPress={
                                handleAddAddress
                            }
                        />

                    </View>

                </ScrollView>

            </KeyboardAvoidingView>
        </ScreenWrapper >
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
        color: COLORS.text,
    },

    card: {
        backgroundColor: "#fff",
        padding: 18,
        borderRadius: 18,
        marginBottom: 14,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.06,
        shadowRadius: 8,

        elevation: 4,
    },

    label: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 6,
    },

    address: {
        color: COLORS.subText,
        lineHeight: 20,
    },

    form: {
        marginTop: 10,
    },

    input: {
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 16,
        marginBottom: 14,

        borderWidth: 1,
        borderColor: "#eee",
    },
    actionRow: {
        flexDirection: "row",
        marginTop: 15,
    },

    editText: {
        color: "#FF6B00",
        fontWeight: "700",
        marginRight: 20,
    },

    deleteText: {
        color: "#E74C3C",
        fontWeight: "700",
    },
});