import styles from "./styles/styles.module.css";
import {formatOrderNumber} from "@/helpers/order.helpers.ts";
import {formatDate} from "@/helpers/date.helpers.ts";
import {formatPrice} from "@/helpers/plant.helpers.ts";
import {DBOrder} from "@/types/order.types.ts";
import {OrderModal} from "@components/order-modal";
import {useState} from "react";

interface OrderTableProps {
    orders: DBOrder[];
}

const OrderTable = ({orders} : OrderTableProps) => {

    const [selectedOrder, setSelectedOrder] = useState<DBOrder | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClick = (order: DBOrder) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    return (
        <>
            <table className={styles['user-orders__table']}>
                <thead>
                <tr className={styles['user-orders__table__head-row']}>
                    <th className={styles['user-orders__table__head-cell']}>Order Number</th>
                    <th className={styles['user-orders__table__head-cell']}>Delivery Date</th>
                    <th className={styles['user-orders__table__head-cell']}>Total</th>
                    <th className={styles['user-orders__table__head-cell']}>Payment Method</th>
                    <th className={styles['user-orders__table__head-cell']}>Status</th>
                </tr>
                </thead>
                <tbody className={styles['user-orders__table__body']}>
                {orders.map((order) => (
                    <tr key={order.orderNumber} className={styles['user-orders__table__row']} onClick={() => handleClick(order)}>
                        <td className={styles['user-orders__table__cell']}>{formatOrderNumber(order.orderNumber)}</td>
                        <td className={styles['user-orders__table__cell']}>{formatDate(order.deliveryDate)}</td>
                        <td className={styles['user-orders__table__cell']}>{formatPrice(order.total)}</td>
                        <td className={styles['user-orders__table__cell']}>{order.paymentMethod}</td>
                        <td className={styles['user-orders__table__cell']}>{order.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {selectedOrder && <OrderModal order={selectedOrder} isOpen={isModalOpen} onClose={handleCloseModal}/>}
        </>
    );
};

export default OrderTable;