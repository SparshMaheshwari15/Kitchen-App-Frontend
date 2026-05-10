import api from "./api";

export const getKitchenOrders =
    async (status = "") => {

        const response =
            await api.get(
                `/order/kitchen?status=${status}`
            );

        return response.data.data;
    };

export const updateOrderStatus =
    async (
        orderId,
        status
    ) => {

        const response =
            await api.patch(
                `/order/${orderId}/status`,
                { status }
            );

        return response.data;
    };

export const createOrder = async (
    orderData
) => {
    const response = await api.post(
        "/order",
        orderData
    );
    return response.data;
};

export const getMyOrders =
    async () => {

        const response =
            await api.get(
                "/order/my"
            );

        return response.data.data;
    };