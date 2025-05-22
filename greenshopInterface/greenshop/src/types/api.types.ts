import {UserData} from "@/types/user.types.ts";

export interface LoginResponse {
    token: string;
    user: UserData;
    message?: string;
}

export interface RegisterResponse {
    user: UserData;
    token: string;
    message?: string;
}

export interface ApiError {
    error: string;
    statusCode: number;
}