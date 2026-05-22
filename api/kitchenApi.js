import api from "./api";

export const getAllKitchens = async () => {
    const response = await api.get("/kitchen");

    return response.data.data;
};

export const getKitchenMeals = async (kitchenId) => {
    const response = await api.get(`/kitchen/${kitchenId}/meals`);

    return response.data.data;
};

export const registerKitchen =
    async (formData) => {

        const response =
            await api.post(
                "/kitchen/register",
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data",
                    },
                }
            );

        return response.data;
    };