import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "@pages/home";
import { Shop } from "@pages/shop";
import { AdminProfile } from "@pages/admin-profile/insex.ts";
import { Blogs } from "@pages/blogs";
import { ErrorPage } from "@pages/error-page";

export const AdminRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/shop/:id" element={<Shop />} />
            <Route path="/admin" element={<AdminProfile />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="*" element={<ErrorPage errorCode="404" />} />
        </Routes>
    );
};