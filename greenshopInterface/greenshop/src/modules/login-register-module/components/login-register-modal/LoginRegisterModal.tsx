import { useState } from 'react';
import styles from '../styles/styles.module.css';
import { Modal } from "@ui/modal";
import {TabsSwitcher} from '../tabs-switcher';
import {LoginForm} from '../login-form';
import {RegisterForm} from '../register-form';
import {RegisterData} from "@/types/user.types.ts";

interface LoginRegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: (email: string, password: string) => void;
    onRegister: (data: RegisterData) => void;
}

const LoginRegisterModal = ({ isOpen, onClose, onLogin, onRegister }: LoginRegisterModalProps) => {
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
    // const [direction, setDirection] = useState<'left' | 'right'>('left');

    const handleTabChange = (tab: 'login' | 'register') => {
        // setDirection(tab === 'register' ? 'right' : 'left');
        setActiveTab(tab);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles['modal-container']}>
                <TabsSwitcher
                    activeTab={activeTab}
                    onChange={handleTabChange}
                />

                <div className={styles['form-container']}>
                    {activeTab === 'login' ? (
                        <LoginForm onSubmit={onLogin} />
                    ) : (
                        <RegisterForm onSubmit={onRegister} />
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default LoginRegisterModal;