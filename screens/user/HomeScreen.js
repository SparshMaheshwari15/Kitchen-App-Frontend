import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

import api from "../../api/api";

export default function HomeScreen({ navigation }) {
    const [kitchens, setKitchens] = useState([]);

    const fetchKitchens = async () => {
        try {
            const response = await api.get("/kitchen");
            setKitchens(response.data.data);
        } catch (error) {
            // console.log(error);
            console.log("API ERROR:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchKitchens();
    }, []);

    const renderKitchen = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() =>
                navigation.navigate("Meals", {
                    kitchenId: item.id,
                    kitchenName: item.name,
                })
            }
        >
            <Text style={styles.name}>
                {item.name}
            </Text>

            <Text style={styles.description}>
                {item.address}
            </Text>

            <Text style={styles.price}>
                Starting From ₹{item.cheapestPrice}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={kitchens}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderKitchen}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "#fff",
    },

    card: {
        backgroundColor: "#f5f5f5",
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
    },

    name: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },

    description: {
        color: "#666",
    },
    price: {
        marginTop: 8,
        fontWeight: "bold",
        color: "#ff7a00",
    },
});