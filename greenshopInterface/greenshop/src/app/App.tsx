import { BrowserRouter } from 'react-router-dom';
import { Layout } from "@/app/layout";
import {AuthProvider, useAuth} from "@/contexts/auth-context/AuthContext.tsx";
import { AdminRouter } from "@/app/routers/admin-router/AdminRouter.tsx";
import { UserRouter } from "@/app/routers/user-router/UserRouter.tsx";
import { GuestRouter } from "@/app/routers/guest-router/GuestRouter.tsx";
import {CartProvider} from "@/contexts/cart-context/CartContext.tsx";

function App() {
    const { isAuthenticated, isAdmin } = useAuth();

    return (
        <AuthProvider>
            <CartProvider>
                <BrowserRouter>
                    <Layout>
                        {isAdmin ? (
                            <AdminRouter />
                        ) : isAuthenticated ? (
                            <UserRouter />
                        ) : (
                            <GuestRouter />
                        )}
                    </Layout>
                </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;