import styles from './styles/styles.module.css';
import { OrderAdminTable } from "@components/order-admin-table";
import { useEffect, useState } from "react";
import { FullOrderData } from "@/types/order.types.ts";
import { fetchAllOrders } from "@/services/orderService.ts";
import { Loader } from "@ui/loader";

const OrderAdministrator = () => {
    const [orders, setOrders] = useState<FullOrderData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const ordersData = await fetchAllOrders();
                setOrders(ordersData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load orders');
                console.error('Error:', err);
            } finally {
                setIsLoading(false);
            }
        };

        loadOrders();
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles['user-orders']}>
            <h2 className={styles['user-orders__title']}>Our orders</h2>
            <OrderAdminTable orders={orders} />
        </div>
    );
};

export default OrderAdministrator;