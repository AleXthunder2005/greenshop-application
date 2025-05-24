// src/services/ordersService.ts
import {API_BASE_URL} from "@/configures/server.config.ts";
import {FullOrderData, OrderAddRequest} from "@/types/order.types.ts";

export const fetchUserOrders = async (userId: string): Promise<FullOrderData[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/orders/user/${userId}`);

        if (response.status === 204) {
            return []; // Нет заказов
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return data.map((order: any) => ({
            orderNumber: order.id,
            plants: order.plants.map((plant: any) => ({
                id: plant.id,
                name: plant.name,
                price: plant.price,
                sale: plant.sale,
                size: plant.size,
                quantity: plant.quantity,
                // image: plant.image || "", // Добавьте поле image в контракт API, если нужно
            })),
            deliveryDate: new Date(order.deliveryDate),
            paymentMethod: "Cash on delivery", // Можно добавить в контракт API
            total: order.plants.reduce(
                (sum: number, plant: any) => sum + (plant.price * plant.quantity * (plant.sale ? (1 - plant.sale/100) : 1)),
                0
            ),
            status: order.status || "is processed",
            firstName: order.user.firstName,
            lastName: order.user.lastName,
            country: order.user.countryry,
            city: order.user.city,
            address: order.user.streetAddress,
            email: order.user.email,
            phone: order.user.phone,
        }));
    } catch (error) {
        console.error('Error fetching user orders:', error);
        throw error;
    }
};

export const addOrder = async (orderData: OrderAddRequest): Promise<{success: boolean, orderId?: string, error?: string}> => {
    try {
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        if (response.status === 201) {
            const data = await response.json();
            return {success: true, orderId: data.id};
        }

        if (response.status === 400) {
            const error = await response.text();
            return {success: false, error: error || 'Invalid order data'};
        }

        if (response.status === 404) {
            return {success: false, error: 'User or plant not found'};
        }

        return {success: false, error: 'Failed to create order'};
    } catch (error) {
        console.error('Error adding order:', error);
        return {success: false, error: 'Network error'};
    }
};