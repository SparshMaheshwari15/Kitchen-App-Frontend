import React, {
    useEffect,
    useState,
} from "react";

import {
    FlatList,
} from "react-native";

import { getKitchenOrders } from "../../api/orderApi";

import ScreenWrapper from "../../components/ScreenWrapper";
import OrderCard from "../../components/OrderCard";

export default function OrdersScreen() {
    const [orders, setOrders] =
        useState([]);

    const fetchOrders =
        async () => {
            try {
                const data =
                    await getKitchenOrders();

                setOrders(data);
            } catch (error) {
                console.log(error.message);
            }
        };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <ScreenWrapper>
            <FlatList
                data={orders}
                keyExtractor={(item) =>
                    item.id
                }
                renderItem={({ item }) => (
                    <OrderCard
                        order={item}
                    />
                )}
                showsVerticalScrollIndicator={
                    false
                }
            />
        </ScreenWrapper>
    );
}