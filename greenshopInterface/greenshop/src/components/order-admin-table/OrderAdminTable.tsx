import styles from './styles/styles.module.css';
import {useState} from "react";
import {FullOrderData} from "@/types/order.types.ts";
import {formatOrderNumber} from "@/helpers/order.helpers.ts";
import {formatDate} from "@/helpers/date.helpers.ts";
import {formatPrice} from "@/helpers/plant.helpers.ts";
import {OrderModal} from "@components/order-modal";

interface OrderAdminTableProps {
    orders: FullOrderData[];
    // onStatusChange : (orderNumber: number, newStatus: OrderStatus) => void;
}

const OrderAdminTable = ({orders} : OrderAdminTableProps) => {
    const [selectedOrder, setSelectedOrder] = useState<FullOrderData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClick = (order: FullOrderData) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    // const handleStatusChange = (orderNumber: number, currentStatus: OrderStatus) => {
    //     let newStatus: OrderStatus;
    //
    //     switch(currentStatus) {
    //         case 'is processed':
    //             newStatus = 'in transit';
    //             break;
    //         case 'in transit':
    //             newStatus = 'delivered';
    //             break;
    //         default:
    //             return; // Не изменяем статус для других случаев
    //     }
    //
    //     onStatusChange(orderNumber, newStatus);
    // }

    // const getActionButton = (order: DBOrder) => {
    //     switch(order.status) {
    //         case 'is processed':
    //             return (
    //                 <span className={styles['user-orders__action-button']}
    //                     onClick={(e) => {
    //                         e.stopPropagation();
    //                         handleStatusChange(order.orderNumber, order.status);
    //                     }}
    //                 >
    //                     Mark as Accepted
    //                 </span>
    //             );
    //         case 'in transit':
    //             return (
    //                 <span className={styles['user-orders__action-button']}
    //                     onClick={(e) => {
    //                         e.stopPropagation();
    //                         handleStatusChange(order.orderNumber, order.status);
    //                     }}
    //                 >
    //                     Mark as Delivered
    //                 </span>
    //             );
    //         default:
    //             return <span className={styles['status-label']}></span>;
    //     }
    // }

    return (
        <>
            <table className={styles['user-orders__table']}>
                <thead>
                <tr className={styles['user-orders__table__head-row']}>
                    <th className={styles['user-orders__table__head-cell']}>Order Number</th>
                    <th className={styles['user-orders__table__head-cell']}>Delivery Date</th>
                    <th className={styles['user-orders__table__head-cell']}>Total</th>
                    <th className={styles['user-orders__table__head-cell']}>Payment Method</th>
                    {/*<th className={styles['user-orders__table__head-cell']}>Status</th>*/}
                    {/*<th className={styles['user-orders__table__head-cell']}>Action</th>*/}
                </tr>
                </thead>
                <tbody className={styles['user-orders__table__body']}>
                {orders.map((order) => (
                    <tr
                        key={order.orderNumber}
                        className={styles['user-orders__table__row']}
                        onClick={() => handleClick(order)}
                    >
                        <td className={styles['user-orders__table__cell']}>{formatOrderNumber(order.orderNumber)}</td>
                        <td className={styles['user-orders__table__cell']}>{formatDate(order.deliveryDate)}</td>
                        <td className={styles['user-orders__table__cell']}>{formatPrice(order.total)}</td>
                        <td className={styles['user-orders__table__cell']}>{order.paymentMethod}</td>
                        {/*<td className={styles['user-orders__table__cell']}>{order.status}</td>*/}
                        {/*<td*/}
                        {/*    className={styles['user-orders__table__cell']}*/}
                        {/*    onClick={(e) => e.stopPropagation()}*/}
                        {/*>*/}
                        {/*    {getActionButton(order)}*/}
                        {/*</td>*/}
                    </tr>
                ))}
                </tbody>
            </table>
            {selectedOrder && (
                <OrderModal
                    order={selectedOrder}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    isUserModal={false}
                />
            )}
        </>
    );
};

export default OrderAdminTable;