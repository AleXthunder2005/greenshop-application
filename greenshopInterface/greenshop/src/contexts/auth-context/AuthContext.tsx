import React, { createContext, useContext} from 'react';
import { UserData } from "@/types/user.types.ts";

interface AuthContextType {
    user: UserData | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
}

const guestContextValue = {
    user: null,
    isAuthenticated: true,
    isAdmin: false,
}

const AuthContext = createContext<AuthContextType>(guestContextValue);

export const AuthProvider = ({ children } : {children : React.ReactNode}) => {
    return (
        <AuthContext.Provider value={guestContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};