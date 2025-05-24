import styles from './styles/styles.module.css'
import {useCallback, useState} from 'react';
import { LoginRegisterModal } from './components/login-register-modal';
import { RegisterData } from "@/types/user.types.ts";
import { DarkGreenButton } from "@ui/dark-green-button";
import { authApi } from '@/api/auth.api.ts';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "@/contexts/auth-context/AuthContext.tsx";
import { Icon } from "@ui/button-icon";

const LoginRegisterModule = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {isAuthenticated, isAdmin, login, logout } = useAuth();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

    const navigate = useNavigate();

    const clearError = useCallback(() => {
        setErrorMessage(null);
    }, []);

    const handleTabChange = useCallback((tab: 'login' | 'register') => {
        setActiveTab(tab);
        clearError();
    }, [clearError]);

    const handleLogin = async (email: string, password: string) => {
        try {
            clearError();
            const { userId, isAdmin } = await authApi.login(email, password);
            login(userId, isAdmin);
            setIsModalOpen(false);

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
            clearError();
            const { userId } = await authApi.register(data);
            login(userId, false);
            setIsModalOpen(false);
            navigate('/profile');
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Registration failed');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className={styles['auth-container']}>
                <DarkGreenButton
                    onClick={() => {
                        setActiveTab('login');
                        clearError();
                        setIsModalOpen(true);
                    }}
                    iconPosition={'left'}
                    iconType={"door"}
                >
                    Login
                </DarkGreenButton>

                <LoginRegisterModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        clearError();
                        setIsModalOpen(false);
                    }}
                    onLogin={handleLogin}
                    onRegister={handleRegister}
                    errorMessage={errorMessage}
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                />
            </div>
        );
    }

    return (
        <div className={styles['auth-container']}>
            <DarkGreenButton
                onClick={logout}
                iconPosition={'left'}
                iconType={"door"}
            >
                Logout
            </DarkGreenButton>

            <div
                className={styles['profile-icon']}
                onClick={() => navigate(isAdmin ? '/admin' : '/profile')}
            >
                <Icon iconType={"user"} />
            </div>
        </div>
    );
};

export default LoginRegisterModule;