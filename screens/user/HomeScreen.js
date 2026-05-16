import React, {
    useEffect,
    useState,
} from "react";

import {
    FlatList,
    StyleSheet,
    View,
    Text
} from "react-native";

import { getAllKitchens } from "../../api/kitchenApi";

import ScreenWrapper from "../../components/ScreenWrapper";
import KitchenCard from "../../components/KitchenCard";
import AppButton from "../../components/AppButton";
import {
    useAuth,
} from "../../context/AuthContext";
export default function HomeScreen({
    navigation,
}) {
    const [kitchens, setKitchens] =
        useState([]);
    const { user, isGuest } =
        useAuth();
    const fetchKitchens =
        async () => {
            try {
                const data =
                    await getAllKitchens();

                setKitchens(data);
            } catch (error) {
                console.log(error.message);
            }
        };

    useEffect(() => {
        fetchKitchens();
    }, []);

    const renderKitchen = ({
        item,
    }) => (
        <KitchenCard
            kitchen={item}
            onPress={() =>
                navigation.navigate(
                    "Meals",
                    {
                        kitchenId: item.id,
                        kitchenName:
                            item.name,
                    }
                )
            }
        />
    );
    return (
        <ScreenWrapper>

            <View style={styles.header}>

                {
                    isGuest ? (

                        <>

                            <Text style={styles.greeting}>
                                Discover Homemade Food 🍳
                            </Text>

                            <Text style={styles.subGreeting}>
                                Fresh meals from local kitchens
                            </Text>

                        </>

                    ) : (

                        <>

                            <Text style={styles.greeting}>
                                Welcome back 👋
                            </Text>

                            <Text style={styles.subGreeting}>
                                {user?.name}
                            </Text>

                        </>

                    )
                }

            </View>
            <FlatList
                data={kitchens}
                keyExtractor={(item) =>
                    item.id.toString()
                }
                renderItem={renderKitchen}
                showsVerticalScrollIndicator={
                    false
                }
            />
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    header: {
        marginBottom: 20,
    },

    greeting: {
        fontSize: 28,
        fontWeight: "700",
        color: "#222",
    },

    subGreeting: {
        marginTop: 6,
        color: "#666",
        fontSize: 15,
    },
});