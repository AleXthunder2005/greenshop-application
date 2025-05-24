import axios from 'axios';
import {API_BASE_URL} from "@/configures/server.config.ts";

export const authApi = {
    async login(email: string, password: string) {
        try {
            const response = await axios.post(`${API_BASE_URL}/users/login`, {
                email,
                password
            });

            if (response.status === 200) {
                return {
                    userId: response.data.userId,
                    isAdmin: response.data.isAdmin
                };
            } else if (response.status === 401) {
                throw new Error('Invalid credentials');
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    throw new Error('Invalid email or password');
                }
                throw new Error(error.response?.data?.message || 'Login failed');
            }
            throw new Error('Login failed');
        }
    },

    async register(data: { username: string; email: string; password: string }) {
        try {
            const response = await axios.post(`${API_BASE_URL}/users/register`, {
                userName: data.username,
                email: data.email,
                password: data.password
            });

            if (response.status === 200) {
                return {
                    userId: response.data.userId
                };
            } else if (response.status === 409) {
                throw new Error('Email is already in use');
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 409) {
                    throw new Error('Email is already in use');
                }
                if (error.response?.status === 400) {
                    throw new Error('Username, email and password are required');
                }
                throw new Error(error.response?.data?.message || 'Registration failed');
            }
            throw new Error('Registration failed');
        }
    }
};