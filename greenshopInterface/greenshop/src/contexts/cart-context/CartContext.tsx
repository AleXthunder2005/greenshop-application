import React, { createContext, useContext, useReducer, useEffect } from 'react';
import {OrderedPlantData} from "@/types/plants.types.ts";

type CartState = OrderedPlantData[];

type CartAction =
    | { type: 'ADD_ITEM'; payload: OrderedPlantData }
    | { type: 'REMOVE_ITEM'; payload: string }
    | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
    | { type: 'CLEAR_CART' }
    | { type: 'LOAD_CART'; payload: CartState };

interface CartContextType {
    cart: CartState;
    dispatch: React.Dispatch<CartAction>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItem = state.find(item => item.id === action.payload.id);
            if (existingItem) {
                return state.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + action.payload.quantity }
                        : item
                );
            }
            return [...state, action.payload];
        }

        case 'REMOVE_ITEM':
            return state.filter(item => item.id !== action.payload);

        case 'UPDATE_QUANTITY': {
            return state.map(item =>
                item.id === action.payload.id
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            );
        }

        case 'CLEAR_CART':
            return [];

        case 'LOAD_CART':
            return action.payload;

        default:
            return state;
    }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, [], () => {
        // Инициализация состояния из localStorage
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        // Сохранение корзины в localStorage при каждом изменении состояния
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return {
        ...context,
        clearCart: () => context.dispatch({ type: 'CLEAR_CART' })
    };
};