import styles from './styles/styles.module.css'
import {OrderAdminTable} from "@components/order-admin-table";
import {useEffect, useState} from "react";
import {FullOrderData} from "@/types/order.types.ts";
import {API_BASE_URL} from "@/configures/server.config.ts";
import {Loader} from "@ui/loader";

const OrderAdministrator = () => {
    const [orders, setOrders] = useState<FullOrderData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/orders`);

                if (response.status === 204) {
                    // Нет содержимого - устанавливаем пустой массив
                    setOrders([]);
                    setIsLoading(false);
                    return;
                }

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                // Преобразуем данные из API в формат FullOrderData
                const formattedOrders: FullOrderData[] = data.map((order: any) => ({
                    orderNumber: order.id,
                    plants: order.plants.map((plant: any) => ({
                        id: plant.id,
                        name: plant.name,
                        price: plant.price,
                        sale: plant.sale,
                        size: plant.size,
                        quantity: plant.quantity,
                    })),
                    deliveryDate: new Date(order.deliveryDate),
                    paymentMethod: "Cash on delivery",
                    total: order.plants.reduce(
                        (sum: number, plant: any) => sum + (plant.price * plant.quantity * (plant.sale ? (1 - plant.sale/100) : 1)),
                        0
                    ),
                    status: "is processed",
                    firstName: order.user.firstName,
                    lastName: order.user.lastName,
                    country: order.user.countryry,
                    city: order.user.city,
                    address: order.user.streetAddress,
                    email: order.user.email,
                    phone: order.user.phone,
                }));

                setOrders(formattedOrders);
            } catch (error) {
                console.error('Error fetching orders:', error);
                alert(`Failed to load orders: ${error instanceof Error ? error.message : String(error)}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []); // Пустой массив зависимостей - выполняется только при монтировании

    if (isLoading) {
        return <Loader/>;
    }

    return (
        <div className={styles['user-orders']}>
            <h2 className={styles['user-orders__title']}>Our orders</h2>
            <OrderAdminTable
                orders={orders}
            />
        </div>
    );
};

export default OrderAdministrator;