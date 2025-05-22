import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "@pages/home";
import { Shop } from "@pages/shop";
import { Profile } from "@pages/profile";
import { Blogs } from "@pages/blogs";
import { ErrorPage } from "@pages/error-page";
import { ShoppingCart } from '@/pages/shoping-cart';
import { CheckoutPage } from "@pages/checkout";

export const UserRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="*" element={<ErrorPage errorCode="404" />} />
        </Routes>
    );
};