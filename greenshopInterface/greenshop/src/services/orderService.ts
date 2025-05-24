// src/services/ordersService.ts
import {API_BASE_URL} from "@/configures/server.config.ts";
import {FullOrderData} from "@/types/order.types.ts";

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