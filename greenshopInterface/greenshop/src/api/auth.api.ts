// api/auth.ts
import { RegisterData } from "@/types/user.types.ts";
import {BASE_API_URL} from "@/configures/server.config.ts";

export const authApi = {
    async login(email: string, password: string) {
        const response = await fetch(`${BASE_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        console.log(response.status);
        if (!response.ok) {
            throw new Error(await response.text());
        }

        return await response.json();
    },

    async register(data: RegisterData) {
        const response = await fetch(`${BASE_API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        console.log(response);
        if (!response.ok) {
            throw new Error(await response.text());
        }

        return await response.json();
    }
};