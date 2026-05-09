import api from "./api";

export const getAllKitchens = async () => {
    const response = await api.get("/kitchen");

    return response.data.data;
};

export const getKitchenMeals = async (kitchenId) => {
    const response = await api.get(`/kitchen/${kitchenId}/meals`);

    return response.data.data;
};