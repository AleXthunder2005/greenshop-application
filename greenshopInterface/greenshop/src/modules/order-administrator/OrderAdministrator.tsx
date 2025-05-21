import styles from './styles/styles.module.css'
import {OrderedPlantData} from "@/types/plants.types.ts";
import {DBOrder} from "@/types/order.types.ts";
import {calculateTotalPrice} from "@/helpers/order.helpers.ts";
import {OrderAdminTable} from "@components/order-admin-table";
import {useState} from "react";

const plantsInCart: OrderedPlantData[] = [
    {
        id: 1,
        name: "Barberton Daisy",
        price: 119.00,
        sale: 13,
        image: "../../assets/plants/plant_1/plant_1.png",
        quantity: 1,
    },
    {
        id: 2, // Предполагаемый ID, так как в данных его нет
        name: "Angel Wing Begonia",
        price: 169.00,
        image: "../../assets/plants/plant_2/plant_2.png",
        quantity: 1,
    },
    {
        id: 3, // Предполагаемый ID
        name: "African Violet",
        price: 229.00,
        sale: 13,
        image: "../../assets/plants/plant_3/plant_3.png",
        quantity: 1,
    }
];

const initialOrders: DBOrder[] =
    [
        {
            plants: plantsInCart,
            deliveryDate: new Date(),
            orderNumber: 1,
            paymentMethod: "Cash on delivery",
            total: calculateTotalPrice(plantsInCart),
            status: "delivered",
        },
        {
            plants: plantsInCart,
            deliveryDate: new Date(),
            orderNumber: 3,
            paymentMethod: "Cash on delivery",
            total: calculateTotalPrice(plantsInCart),
            status: "in transit",
        },
        {
            plants: plantsInCart,
            deliveryDate: new Date(),
            orderNumber: 5,
            paymentMethod: "Cash on delivery",
            total: calculateTotalPrice(plantsInCart),
            status: "is processed",
        },
        {
            plants: plantsInCart,
            deliveryDate: new Date(),
            orderNumber: 7,
            paymentMethod: "Cash on delivery",
            total: calculateTotalPrice(plantsInCart),
            status: "delivered",
        },
        {
            plants: plantsInCart,
            deliveryDate: new Date(),
            orderNumber: 8,
            paymentMethod: "Cash on delivery",
            total: calculateTotalPrice(plantsInCart),
            status: "in transit",
        },
        {
            plants: plantsInCart,
            deliveryDate: new Date(),
            orderNumber: 9,
            paymentMethod: "Cash on delivery",
            total: calculateTotalPrice(plantsInCart),
            status: "is processed",
        },
        {
            plants: plantsInCart,
            deliveryDate: new Date(),
            orderNumber: 11,
            paymentMethod: "Cash on delivery",
            total: calculateTotalPrice(plantsInCart),
            status: "delivered",
        },
        {
            plants: plantsInCart,
            deliveryDate: new Date(),
            orderNumber: 13,
            paymentMethod: "Cash on delivery",
            total: calculateTotalPrice(plantsInCart),
            status: "in transit",
        },
        {
            plants: plantsInCart,
            deliveryDate: new Date(),
            orderNumber: 15,
            paymentMethod: "Cash on delivery",
            total: calculateTotalPrice(plantsInCart),
            status: "is processed",
        },
        {
            plants: plantsInCart,
            deliveryDate: new Date(),
            orderNumber: 16,
            paymentMethod: "Cash on delivery",
            total: calculateTotalPrice(plantsInCart),
            status: "delivered",
        },
        {
            plants: plantsInCart,
            deliveryDate: new Date(),
            orderNumber: 37,
            paymentMethod: "Cash on delivery",
            total: calculateTotalPrice(plantsInCart),
            status: "in transit",
        },
        {
            plants: plantsInCart,
            deliveryDate: new Date(),
            orderNumber: 58,
            paymentMethod: "Cash on delivery",
            total: calculateTotalPrice(plantsInCart),
            status: "is processed",
        },
    ]

const OrderAdministrator = () => {
    const [orders, setOrders] = useState<DBOrder[]>(initialOrders);

    // Функция для изменения статуса заказа
    const handleStatusChange = async (orderNumber: number, newStatus: OrderStatus) => {
        try {
            // Здесь будет вызов API для обновления статуса
            // await api.updateOrderStatus(orderNumber, newStatus);

            // Временное обновление состояния локально
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.orderNumber === orderNumber
                        ? { ...order, status: newStatus }
                        : order
                )
            );

            console.log(`Order ${orderNumber} status changed to ${newStatus}`);
        } catch (error) {
            console.error('Failed to update order status:', error);
        }
    };

    return (
        <div className={styles['user-orders']}>
            <h2 className={styles['user-orders__title']}>Our orders</h2>
            <OrderAdminTable
                orders={orders}
                onStatusChange={handleStatusChange}
            />
        </div>
    );
};

export default OrderAdministrator;