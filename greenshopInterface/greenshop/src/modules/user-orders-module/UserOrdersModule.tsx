import styles from './styles/styles.module.css'
import {OrderTable} from "@components/order-table";
import {useEffect, useState} from "react";
import {FullOrderData} from "@/types/order.types.ts";
import {Loader} from "@ui/loader";
import {fetchUserOrders} from "@/services/orderService.ts";
import {useAuth} from "@/contexts/auth-context/AuthContext.tsx";

const UserOrdersModule = () => {
    const [orders, setOrders] = useState<FullOrderData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {userId} = useAuth();

    useEffect(() => {
        if (!userId) {
            setIsLoading(false);
            return;
        }

        const loadOrders = async () => {
            try {
                const userOrders = await fetchUserOrders(userId);
                setOrders(userOrders);
            } catch (err) {
                setError('Failed to load orders. Please try again later.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        loadOrders();
    }, [userId]);

    if (isLoading) {
        return <Loader/>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    if (orders.length === 0) {
        return (
            <div className={styles['user-orders']}>
                <h2 className={styles['user-orders__title']}>Your Orders</h2>
                <p className={styles['no-orders']}>You don't have any orders yet.</p>
            </div>
        );
    }

    return (
        <div className={styles['user-orders']}>
            <h2 className={styles['user-orders__title']}>Your Orders</h2>
            <OrderTable orders={orders}/>
        </div>
    );
};

export default UserOrdersModule;