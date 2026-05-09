import api from "./api";

export const getKitchenOrders =
    async () => {
        const response = await api.get(
            "/order/kitchen"
        );

        return response.data.data;
    };