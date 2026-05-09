import api from "./api";

export const createMeal = async (
    mealData
) => {
    const response = await api.post(
        "/meal",
        mealData
    );

    return response.data;
};