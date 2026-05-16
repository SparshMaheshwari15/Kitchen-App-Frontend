import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CartProvider>
        <AuthProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </AuthProvider>
      </CartProvider>
    </GestureHandlerRootView>
  );
}