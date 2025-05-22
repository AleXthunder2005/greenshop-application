import { useState } from 'react';
import { LoginRegisterModal } from './components/login-register-modal';
import { RegisterData } from "@/types/user.types.ts";
import { DarkGreenButton } from "@ui/dark-green-button";
import { authApi } from '@/api/auth.api.ts';
import { useNavigate } from 'react-router-dom';
import {BASE_API_URL} from "@/configures/server.config.ts";

const LoginRegisterModule = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (email: string, password: string) => {
        //try {
            // const { user, token } = await authApi.login(email, password);
            // console.log(user);
            // console.log(token);
            // //login(user, token);
            // setIsModalOpen(false);

            console.log(await fetch(`${BASE_API_URL}/test`, {
                method: 'POST',
            })

        );

            //navigate('/profile');
        // } catch (error) {
        //     alert(error);
        // }
    };

    const handleRegister = async (data: RegisterData) => {
        try {
            const { user, token } = await authApi.register(data);
            console.log(user);
            console.log(token);
            //login(user, token);
            setIsModalOpen(false);
            navigate('/profile');
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div>
            <DarkGreenButton
                onClick={() => setIsModalOpen(true)}
                iconPosition={'left'}
                iconType={"door"}
            >
                Login
            </DarkGreenButton>

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