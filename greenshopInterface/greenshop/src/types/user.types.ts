export type RegisterData = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export type UserData = {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    country: string;
    city: string;
    address: string;
    email: string;
    phone?: string;
    notes?: string;
    role?: 'user' | 'admin';
}