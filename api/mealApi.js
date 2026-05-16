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

export const getMyMeals =
    async () => {

        const response =
            await api.get(
                "/meal/my-meals"
            );

        return response.data.data;
    };

export const updateMeal =
    async (
        mealId,
        mealData
    ) => {

        const response =
            await api.patch(
                `/meal/${mealId}`,
                mealData
            );

        return response.data;
    };

export const deleteMeal =
    async (mealId) => {

        const response =
            await api.delete(
                `/meal/${mealId}`
            );

        return response.data;
    };

export const toggleMealAvailability =
    async (
        mealId,
        isAvailable
    ) => {

        const response =
            await api.patch(
                `/meal/${mealId}/availability`,
                { isAvailable }
            );

        return response.data;
    };