import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "@pages/home";
import { Shop } from "@pages/shop";
import { Blogs } from "@pages/blogs";
import LoginPage from "@pages/login-page/LoginPage.tsx";

export const GuestRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/shop/:id" element={<Shop />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/cart" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
    );
};