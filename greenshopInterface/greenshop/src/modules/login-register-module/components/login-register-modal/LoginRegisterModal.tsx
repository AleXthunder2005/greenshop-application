import styles from '../styles/styles.module.css';
import { Modal } from "@ui/modal";
import { TabsSwitcher } from '../tabs-switcher';
import { LoginForm } from '../login-form';
import { RegisterForm } from '../register-form';
import { RegisterData } from "@/types/user.types.ts";
import { DarkGreenButton } from "@ui/dark-green-button";
import { useNavigate } from "react-router-dom";

interface LoginRegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: (email: string, password: string) => void;
    onRegister: (data: RegisterData) => void;
    isPage?: boolean;
    errorMessage?: string | null;
    activeTab: 'login' | 'register';
    onTabChange: (tab: 'login' | 'register') => void;
}

const LoginRegisterModal = ({
                                isOpen,
                                onClose,
                                onLogin,
                                onRegister,
                                isPage = false,
                                errorMessage,
                                activeTab,
                                onTabChange
                            }: LoginRegisterModalProps) => {
    const navigate = useNavigate();

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles['modal-container']}>
                <TabsSwitcher
                    activeTab={activeTab}
                    onChange={onTabChange}
                />

                <div className={styles['form-container']}>
                    {activeTab === 'login' ? (
                        <LoginForm onSubmit={onLogin} />
                    ) : (
                        <RegisterForm onSubmit={onRegister} />
                    )}

                    {errorMessage && (
                        <div className={styles['error-message']}>
                            {errorMessage}
                        </div>
                    )}

                    {isPage && (
                        <DarkGreenButton
                            className={styles['form-container__button']}
                            onClick={() => navigate('/home')}
                        >
                            Continue Shopping
                        </DarkGreenButton>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default LoginRegisterModal;