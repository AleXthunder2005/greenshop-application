import { useState } from 'react';
import {LoginRegisterModal} from './components/login-register-modal';
import {RegisterData} from "@/types/user.types.ts";
import {DarkGreenButton} from "@ui/dark-green-button";

const LoginRegisterModule = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogin = (email: string, password: string) => {
        console.log('Login with:', email, password);
        // API call here
    };

    const handleRegister = (data: RegisterData) => {
        console.log('Register with:', data);
        // API call here
    };

    return (
        <div>
            <DarkGreenButton
                onClick={() => setIsModalOpen(true)}
                iconPosition={'left'}
                iconType={"door"}
            >Login</DarkGreenButton>

            <LoginRegisterModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onLogin={handleLogin}
                onRegister={handleRegister}
            />
        </div>
    );
};

export default LoginRegisterModule;