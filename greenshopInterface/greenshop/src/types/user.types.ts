export type RegisterData = {
    username: string;
    email: string;
    password: string;
};

export type UserData = {
    id: string;
    firstName?: string;
    lastName?: string;
    username: string;
    country?: string;
    city?: string;
    address?: string;
    email: string;
    phone?: string;
    role?: string;
}