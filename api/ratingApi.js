import api from "./api";

export const submitRating =
    async (ratingData) => {

        const response =
            await api.post(
                "/rating",
                ratingData
            );

        return response.data;
    };