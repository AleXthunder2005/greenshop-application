import React, { createContext, useContext} from 'react';
import { UserData } from "@/types/user.types.ts";

interface AuthContextType {
    user: UserData | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
}

const guestContextValue = {
    user: null,
    isAuthenticated: false,
    isAdmin: false,
}

const AuthContext = createContext<AuthContextType>(guestContextValue);

export const AuthProvider = ({ children } : {children : React.ReactNode}) => {
    // const [state, setState] = useState<{
    //     user: UserData | null;
    //     loading: boolean;
    // }>({
    //     user: null,
    //     loading: true,
    // });
    //
    // useEffect(() => {
    //     const initializeAuth = async () => {
    //         const token = localStorage.getItem('token');
    //         const userData = localStorage.getItem('user');
    //
    //         if (token && userData) {
    //             try {
    //                 setState({
    //                     user: JSON.parse(userData),
    //                     loading: false,
    //                 });
    //                 return;
    //             } catch (e) {
    //                 console.error('Failed to parse user data', e);
    //             }
    //         }
    //         setState(prev => ({ ...prev, loading: false }));
    //     };
    //
    //     initializeAuth();
    // }, []);
    //
    // const login = (userData: UserData, token: string) => {
    //     localStorage.setItem('token', token);
    //     localStorage.setItem('user', JSON.stringify(userData));
    //     setState({ user: userData, loading: false });
    // };
    //
    // const logout = () => {
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('user');
    //     setState({ user: null, loading: false });
    // };
    //
    // const value = {
    //     user: state.user,
    //     isAuthenticated: !!state.user,
    //     isAdmin: state.user?.role === 'admin',
    //     login,
    //     logout,
    //     loading: state.loading,
    // };

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