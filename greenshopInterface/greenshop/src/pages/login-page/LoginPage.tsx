import {RegisterData} from "@/types/user.types.ts";
import {LoginRegisterModal} from "@modules/login-register-module/components/login-register-modal";

const LoginPage = () => {

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
            <LoginRegisterModal
                isOpen={true}
                onClose={() => undefined}
                onLogin={handleLogin}
                onRegister={handleRegister}
                isPage={true}
            />
        </div>
    );
};

export default LoginPage;