// src/services/ordersService.ts
import {API_BASE_URL} from "@/configures/server.config.ts";
import {FullOrderData, OrderAddRequest} from "@/types/order.types.ts";
import {getPlantImages} from "@/services/plantService.ts";

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

        // Преобразуем заказы асинхронно
        const orders = await Promise.all(data.map(async (order: any) => {
            // Для каждого растения в заказе получаем изображения
            const plantsWithImages = await Promise.all(
                order.plants.map(async (plant: any) => {
                    try {
                        // Получаем изображения для растения
                        const images = await getPlantImages(plant.id);
                        return {
                            id: plant.id,
                            name: plant.name,
                            price: plant.price,
                            sale: plant.sale,
                            size: plant.size,
                            quantity: plant.quantity,
                            image: images.length > 0 ? images[0] : null, // Первое изображение или null
                        };
                    } catch (error) {
                        console.error(`Error loading images for plant ${plant.id}:`, error);
                        return {
                            ...plant,
                            image: null, // В случае ошибки возвращаем null для изображения
                        };
                    }
                })
            );

            return {
                orderNumber: order.id,
                plants: plantsWithImages,
                deliveryDate: new Date(order.deliveryDate),
                paymentMethod: "Cash on delivery",
                total: plantsWithImages.reduce(
                    (sum, plant) => sum + (plant.price * plant.quantity * (plant.sale ? (1 - plant.sale/100) : 1)),
                    0
                ),
                status: order.status || "is processed",
                firstName: order.user.firstName,
                lastName: order.user.lastName,
                country: order.user.country,
                city: order.user.city,
                address: order.user.streetAddress,
                email: order.user.email,
                phone: order.user.phone,
            };
        }));

        return orders;
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

export const fetchAllOrders = async (): Promise<FullOrderData[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/orders`);

        if (response.status === 204) {
            return []; // Нет заказов
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Асинхронно преобразуем заказы с загрузкой изображений
        const orders = await Promise.all(data.map(async (order: any) => {
            const plantsWithImages = await Promise.all(
                order.plants.map(async (plant: any) => {
                    try {
                        const images = await getPlantImages(plant.id);
                        return {
                            id: plant.id,
                            name: plant.name,
                            price: plant.price,
                            sale: plant.sale,
                            size: plant.size,
                            quantity: plant.quantity,
                            image: images.length > 0 ? images[0] : null,
                        };
                    } catch (error) {
                        console.error(`Error loading images for plant ${plant.id}:`, error);
                        return {
                            ...plant,
                            image: null,
                        };
                    }
                })
            );

            return {
                orderNumber: order.id,
                plants: plantsWithImages,
                deliveryDate: new Date(order.deliveryDate),
                paymentMethod: "Cash on delivery",
                total: plantsWithImages.reduce(
                    (sum, plant) => sum + (plant.price * plant.quantity * (plant.sale ? (1 - plant.sale/100) : 1)),
                    0
                ),
                status: order.status || "is processed",
                firstName: order.user.firstName,
                lastName: order.user.lastName,
                country: order.user.country,
                city: order.user.city,
                address: order.user.streetAddress,
                email: order.user.email,
                phone: order.user.phone,
            };
        }));

        return orders;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};