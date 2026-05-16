import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext =
    createContext();

export const AuthProvider =
    ({ children }) => {

        const [user, setUser] =
            useState(null);

        const [loading,
            setLoading] =
            useState(true);

        useEffect(() => {

            loadUser();

        }, []);

        const loadUser = async () => {

            try {

                const storedUser =
                    await AsyncStorage.getItem(
                        "user"
                    );

                if (
                    storedUser
                ) {

                    setUser(
                        JSON.parse(
                            storedUser
                        )
                    );
                }

            } catch (error) {

                console.log(
                    error
                );

            } finally {

                setLoading(
                    false
                );
            }
        };

        const login = async (
            userData
        ) => {

            await AsyncStorage.setItem(
                "user",
                JSON.stringify(
                    userData
                )
            );

            await AsyncStorage.setItem(
                "devPhone",
                userData.phone
            );

            setUser(
                userData
            );
        };

        const logout = async () => {

            await AsyncStorage.removeItem(
                "user"
            );

            await AsyncStorage.removeItem(
                "devPhone"
            );

            setUser(
                null
            );
        };

        return (
            <AuthContext.Provider
                value={{
                    user,
                    loading,
                    login,
                    logout,

                    isGuest: !user,
                }}
            >
                {children}
            </AuthContext.Provider>
        );
    };

export const useAuth =
    () => useContext(
        AuthContext
    );