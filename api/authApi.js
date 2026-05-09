import api from "./api";

export const loginUser = async (
    idToken
) => {
    const response = await api.post(
        "/auth/login",
        {
            idToken,
        }
    );

    return response.data;
};