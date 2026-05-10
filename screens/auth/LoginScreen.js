// import React, { useState } from "react";

// import {
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     StyleSheet,
// } from "react-native";
// import ScreenWrapper from "../../components/ScreenWrapper";

// export default function LoginScreen({
//     navigation,
// }) {
//     const [phone, setPhone] =
//         useState("");

//     return (
//         <ScreenWrapper>
//             <View style={styles.header}>
//                 <Text style={styles.logo}>🍳</Text>
//                 <Text style={styles.title}>
//                     Home Chef
//                 </Text>
//                 <Text style={styles.subtitle}>
//                     Fresh meals at your doorstep
//                 </Text>
//             </View>

//             <View style={styles.formContainer}>
//                 <View style={styles.inputWrapper}>
//                     <Text style={styles.label}>Phone Number</Text>
//                     <TextInput
//                         placeholder="+91 98765 43210"
//                         placeholderTextColor="#bbb"
//                         value={phone}
//                         onChangeText={setPhone}
//                         keyboardType="phone-pad"
//                         style={styles.input}
//                     />
//                 </View>

//                 <TouchableOpacity
//                     style={[styles.button, styles.userButton]}
//                     onPress={() =>
//                         navigation.replace("UserTabs")
//                     }
//                 >
//                     <Text style={styles.buttonText}>
//                         👤 Login as User
//                     </Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                     style={[styles.button, styles.kitchenButton]}
//                     onPress={() =>
//                         navigation.replace(
//                             "KitchenTabs"
//                         )
//                     }
//                 >
//                     <Text style={styles.buttonText}>
//                         👨‍🍳 Login as Kitchen
//                     </Text>
//                 </TouchableOpacity>
//             </View>

//             <View style={styles.footer}>
//                 <Text style={styles.footerText}>
//                     By logging in, you agree to our Terms & Conditions
//                 </Text>
//             </View>
//         </ScreenWrapper>
//     );
// }

// const styles = StyleSheet.create({
//     header: {
//         alignItems: "center",
//         marginBottom: 60,
//         marginTop: 20,
//     },

//     logo: {
//         fontSize: 64,
//         marginBottom: 16,
//     },

//     title: {
//         fontSize: 36,
//         fontWeight: "bold",
//         color: "#222",
//         marginBottom: 8,
//     },

//     subtitle: {
//         fontSize: 14,
//         color: "#888",
//         fontStyle: "italic",
//     },

//     formContainer: {
//         flex: 1,
//     },

//     inputWrapper: {
//         marginBottom: 32,
//     },

//     label: {
//         fontSize: 13,
//         fontWeight: "600",
//         color: "#555",
//         marginBottom: 10,
//         textTransform: "uppercase",
//         letterSpacing: 0.5,
//     },

//     input: {
//         borderWidth: 2,
//         borderColor: "#e0e0e0",
//         borderRadius: 12,
//         padding: 16,
//         fontSize: 16,
//         backgroundColor: "#f9f9f9",
//         color: "#222",
//     },

//     button: {
//         padding: 16,
//         borderRadius: 12,
//         marginBottom: 12,
//         alignItems: "center",
//         justifyContent: "center",
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 3,
//     },

//     userButton: {
//         backgroundColor: "#ff7a00",
//     },

//     kitchenButton: {
//         backgroundColor: "#222",
//     },

//     buttonText: {
//         color: "#fff",
//         textAlign: "center",
//         fontWeight: "700",
//         fontSize: 16,
//         letterSpacing: 0.3,
//     },

//     footer: {
//         paddingBottom: 20,
//         alignItems: "center",
//     },

//     footerText: {
//         fontSize: 11,
//         color: "#999",
//         textAlign: "center",
//     },
// });

import React, { useState } from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import ScreenWrapper from "../../components/ScreenWrapper";

export default function LoginScreen({
    navigation,
}) {
    const [phone, setPhone] =
        useState("");

    return (
        <ScreenWrapper>
            <View style={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.logo}>
                        🍳
                    </Text>

                    <Text style={styles.title}>
                        Home Chef
                    </Text>

                    <Text style={styles.subtitle}>
                        Fresh homemade meals delivered daily
                    </Text>
                </View>

                <View style={styles.card}>

                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>
                            Phone Number
                        </Text>

                        <TextInput
                            placeholder="+91 98765 43210"
                            placeholderTextColor="#bbb"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                            style={styles.input}
                        />
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.button,
                            styles.userButton,
                        ]}
                        onPress={() =>
                            navigation.replace(
                                "UserTabs"
                            )
                        }
                    >
                        <Text style={styles.buttonText}>
                            👤 Continue as User
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.button,
                            styles.kitchenButton,
                        ]}
                        onPress={() =>
                            navigation.replace(
                                "KitchenTabs"
                            )
                        }
                    >
                        <Text style={styles.buttonText}>
                            👨‍🍳 Continue as Kitchen
                        </Text>
                    </TouchableOpacity>

                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        By continuing, you agree to our Terms & Conditions
                    </Text>
                </View>

            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        paddingVertical: 20,
    },

    header: {
        alignItems: "center",
        marginTop: 40,
    },

    logo: {
        fontSize: 70,
        marginBottom: 18,
    },

    title: {
        fontSize: 38,
        fontWeight: "bold",
        color: "#222",
        marginBottom: 10,
    },

    subtitle: {
        fontSize: 15,
        color: "#777",
        textAlign: "center",
        paddingHorizontal: 20,
        lineHeight: 22,
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 28,
        padding: 24,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.06,
        shadowRadius: 12,

        elevation: 5,
    },

    inputWrapper: {
        marginBottom: 28,
    },

    label: {
        fontSize: 13,
        fontWeight: "700",
        color: "#555",
        marginBottom: 10,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },

    input: {
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 16,
        padding: 18,
        fontSize: 16,
        backgroundColor: "#fafafa",
        color: "#222",
    },

    button: {
        paddingVertical: 18,
        borderRadius: 16,
        marginBottom: 14,
        alignItems: "center",
        justifyContent: "center",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.08,
        shadowRadius: 6,

        elevation: 4,
    },

    userButton: {
        backgroundColor: "#FF6B00",
    },

    kitchenButton: {
        backgroundColor: "#222",
    },

    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.3,
    },

    footer: {
        alignItems: "center",
        paddingHorizontal: 20,
    },

    footerText: {
        fontSize: 11,
        color: "#999",
        textAlign: "center",
        lineHeight: 18,
    },
});