import api from "./api";

export const getMyAddresses =
    async () => {

        const response =
            await api.get(
                "/address/my"
            );

        return response.data.data;
    };

export const addAddress =
    async (addressData) => {

        const response =
            await api.post(
                "/address",
                addressData
            );

        return response.data;
    };

export const updateAddress =
    async (
        addressId,
        addressData
    ) => {

        const response =
            await api.patch(
                `/address/${addressId}`,
                addressData
            );

        return response.data;
    };

export const deleteAddress =
    async (addressId) => {

        const response =
            await api.delete(
                `/address/${addressId}`
            );

        return response.data;
    };