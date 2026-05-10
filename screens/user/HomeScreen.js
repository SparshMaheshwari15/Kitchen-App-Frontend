import React, {
    useEffect,
    useState,
} from "react";

import {
    FlatList,
} from "react-native";

import { getAllKitchens } from "../../api/kitchenApi";

import ScreenWrapper from "../../components/ScreenWrapper";
import KitchenCard from "../../components/KitchenCard";
import AppButton from "../../components/AppButton";

export default function HomeScreen({
    navigation,
}) {
    const [kitchens, setKitchens] =
        useState([]);

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
            <AppButton
                title="My Orders"
                onPress={() =>
                    navigation.navigate(
                        "MyOrders"
                    )
                }
            />
            <AppButton
                title="Logout"
                type="secondary"
                onPress={() =>
                    navigation.replace(
                        "Login"
                    )
                }
            />
        </ScreenWrapper>
    );
}