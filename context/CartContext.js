import React, {
    createContext,
    useContext,
    useState,
} from "react";

const CartContext =
    createContext();

export const CartProvider = ({
    children,
}) => {
    const [cartItems, setCartItems] =
        useState([]);

    const addToCart = (meal) => {

        if (
            cartItems.length > 0 &&
            cartItems[0].kitchenId !==
            meal.kitchenId
        ) {

            setCartItems([
                {
                    ...meal,
                    quantity: 1,
                    quantityAvailable:
                        meal.quantity,
                }
            ]);

            return;
        }

        const existingItem =
            cartItems.find(
                (item) =>
                    item.id === meal.id
            );

        if (existingItem) {

            const updatedCart =
                cartItems.map((item) =>
                    item.id === meal.id
                        ? {
                            ...item,
                            quantity:
                                item.quantity + 1,
                        }
                        : item
                );

            setCartItems(updatedCart);

        } else {

            setCartItems([
                ...cartItems,

                {
                    ...meal,
                    quantity: 1,
                    quantityAvailable:
                        meal.quantity,
                }
            ]);
        }
    };
    const increaseQuantity = (
        mealId
    ) => {

        const existingItem =
            cartItems.find(
                (item) =>
                    item.id === mealId
            );

        if (
            existingItem.quantity >=
            existingItem.quantityAvailable
        ) {

            return;
        }

        const updatedCart =
            cartItems.map((item) =>
                item.id === mealId
                    ? {
                        ...item,
                        quantity:
                            item.quantity + 1,
                    }
                    : item
            );

        setCartItems(updatedCart);
    };
    const decreaseQuantity = (
        mealId
    ) => {

        const existingItem =
            cartItems.find(
                (item) =>
                    item.id === mealId
            );

        if (
            existingItem.quantity === 1
        ) {

            removeFromCart(mealId);

            return;
        }

        const updatedCart =
            cartItems.map((item) =>
                item.id === mealId
                    ? {
                        ...item,
                        quantity:
                            item.quantity - 1,
                    }
                    : item
            );

        setCartItems(updatedCart);
    };
    const removeFromCart = (
        mealId
    ) => {
        const updatedCart =
            cartItems.filter(
                (item) =>
                    item.id !== mealId
            );

        setCartItems(updatedCart);
    };

    const getTotal = () => {
        return cartItems.reduce(
            (total, item) =>
                total +
                item.price *
                item.quantity,
            0
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };
    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                getTotal,
                clearCart,
                increaseQuantity,
                decreaseQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () =>
    useContext(CartContext);