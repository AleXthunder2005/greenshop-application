import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserData } from "@/types/user.types.ts";

interface AuthContextType {
    user: UserData | null;
    userId: string | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
    login: (userId: string, isAdmin: boolean) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    const login = (userId: string, isAdmin: boolean) => {
        localStorage.setItem('userId', userId);
        localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
        setUserId(userId);
        setIsAdmin(isAdmin);
    };

    const logout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('isAdmin');
        setUser(null);
        setUserId(null);
        setIsAdmin(false);
    };

    // Проверяем наличие userId при инициализации
    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        const storedIsAdmin = localStorage.getItem('isAdmin');

        if (storedUserId) {
            setUserId(storedUserId);
            setIsAdmin(storedIsAdmin === 'true');
        }
    }, []);

    const value = {
        user,
        userId,
        isAuthenticated: !!userId,
        isAdmin,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
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