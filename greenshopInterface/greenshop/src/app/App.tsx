import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import { Home } from '@pages/home';
import { Shop } from "@pages/shop";
import { Layout } from "@/app/layout";
import { ShoppingCart } from '@/pages/shoping-cart';
import { CheckoutPage } from "@pages/checkout";
import { Profile } from "@pages/profile";
import { AdminProfile } from "@pages/admin-profile/insex.ts";
import { Blogs } from "@pages/blogs";
import { ErrorPage } from "@pages/error-page";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    {/* Перенаправление с корневой страницы на /home */}
                    <Route path="/" element={<Navigate to="/home" />} />

                    {/* Маршруты для существующих страниц */}
                    <Route path="/home" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/cart" element={<ShoppingCart />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/admin" element={<AdminProfile />} />
                    <Route path="/blogs" element={<Blogs />} />

                    {/* Маршрут для страницы ошибок */}
                    <Route path="/error/:errorCode" element={<ErrorPage errorCode={'404'}/>} />

                    {/* Маршрут для всех остальных (несуществующих) страниц */}
                    <Route path="*" element={<ErrorPage errorCode="404" />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;