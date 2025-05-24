// src/services/userService.ts
import {API_BASE_URL} from "@/configures/server.config.ts";
import {BillingFormData} from "@/types/order.types.ts";

interface UserResponse {
    id: string;
    userName: string;
    email: string;
    firstName: string;
    lastName: string;
    country: string;
    city: string;
    streetAddress: string;
    phoneNumber?: string;
}

export const fetchUserProfile = async (userId: string): Promise<BillingFormData> => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: UserResponse = await response.json();

        return {
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            country: data.country || '',
            city: data.city || '',
            address: data.streetAddress || '',
            email: data.email,
            phone: data.phoneNumber,
        };
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

export const updateUserProfile = async (userId: string, profileData: BillingFormData): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: profileData.firstName,
                lastName: profileData.lastName,
                country: profileData.country,
                city: profileData.city,
                streetAddress: profileData.address,
                phoneNumber: profileData.phone,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return true;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};