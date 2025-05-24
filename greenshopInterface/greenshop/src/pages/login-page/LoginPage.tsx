import { useNavigate } from 'react-router-dom';
import { authApi } from '@/api/auth.api.ts';
import { useAuth } from '@/contexts/auth-context/AuthContext.tsx';
import { LoginRegisterModal } from "@modules/login-register-module/components/login-register-modal";
import { RegisterData } from "@/types/user.types.ts";
import { useState } from 'react';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleLogin = async (email: string, password: string) => {
        try {
            const { userId, isAdmin } = await authApi.login(email, password);
            login(userId, isAdmin);

            if (isAdmin) {
                navigate('/admin');
                window.location.reload();
            } else {
                navigate('/profile');
            }

        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Login failed');
        }
    };

    const handleRegister = async (data: RegisterData) => {
        try {
            setErrorMessage(null);
            const { userId } = await authApi.register(data);
            login(userId, false);
            navigate('/profile', { replace: true });
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Registration failed');
        }
    };

    return (
        <div className="login-page-container">
            <LoginRegisterModal
                isOpen={true}
                onClose={() => navigate('/')} // Закрытие ведет на главную страницу
                onLogin={handleLogin}
                onRegister={handleRegister}
                errorMessage={errorMessage}
                activeTab="login" // По умолчанию открыта вкладка логина
                onTabChange={() => setErrorMessage(null)}
                isPage={true}
            />
        </div>
    );
};

export default LoginPage;