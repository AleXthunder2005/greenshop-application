import { BrowserRouter } from 'react-router-dom';
import { Layout } from "@/app/layout";
import {AuthProvider, useAuth} from "@/contexts/auth-context/AuthContext.tsx";
import { AdminRouter } from "@/app/routers/admin-router/AdminRouter.tsx";
import { UserRouter } from "@/app/routers/user-router/UserRouter.tsx";
import { GuestRouter } from "@/app/routers/guest-router/GuestRouter.tsx";
import { CartProvider } from "@/contexts/cart-context/CartContext.tsx";

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <BrowserRouter>
                    <Layout>
                        <RouterSelector />
                    </Layout>
                </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    );
}

const RouterSelector = () => {
    const { isAuthenticated, isAdmin } = useAuth();

    if (isAdmin) {
        return <AdminRouter />;
    }
    if (isAuthenticated) {
        return <UserRouter />;
    }
    return <GuestRouter />;
};

export default App;