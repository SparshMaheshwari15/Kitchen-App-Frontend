import React, { useState } from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import {
    getAuth,
    signInWithCredential,
    PhoneAuthProvider,
} from "firebase/auth";

import { firebaseApp } from "../../firebase/config";

import { loginUser } from "../../api/authApi";
import ScreenWrapper from "../../components/ScreenWrapper";

export default function OtpScreen({
    route,
}) {
    const { verificationId } =
        route.params;

    const [otp, setOtp] = useState("");

    const verifyOtp = async () => {
        try {
            const auth =
                getAuth(firebaseApp);

            const credential =
                PhoneAuthProvider.credential(
                    verificationId,
                    otp
                );

            const userCredential =
                await signInWithCredential(
                    auth,
                    credential
                );

            const idToken =
                await userCredential.user.getIdToken();

            const backendUser =
                await loginUser(idToken);

            console.log(backendUser);

        } catch (error) {
            console.log(
                "VERIFY OTP ERROR:",
                error.message
            );
        }
    };

    return (
        <ScreenWrapper>
            <Text style={styles.title}>
                Enter OTP
            </Text>

            <TextInput
                placeholder="123456"
                value={otp}
                onChangeText={setOtp}
                keyboardType="numeric"
                style={styles.input}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={verifyOtp}
            >
                <Text style={styles.buttonText}>
                    Verify OTP
                </Text>
            </TouchableOpacity>
        </ScreenWrapper>
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
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 30,
    },

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
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