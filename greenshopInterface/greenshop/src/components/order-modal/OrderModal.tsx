import {Modal} from "@ui/modal";
import {CartViewer} from "@components/cart-viewer";
import styles from './styles/styles.module.css'
import {DarkGreenButton} from "@ui/dark-green-button";
import thankYouImage from "@components/order-modal/assets/thank-you.svg";
import {FullOrderData, OrderStatus} from "@/types/order.types.ts";
import {prepareOrderDateForTable} from "@components/order-modal/helpers/orderModal.helpers.ts";
import {useNavigate} from "react-router-dom";

interface OrderModalProps {
    order: FullOrderData;
    isOpen: boolean;
    onClose: () => void;
    isUserModal?: boolean;
}

interface OrderModalVariant {
    orderStatus: OrderStatus;
    headerText: string;
    footerText: string;
    buttonText: string;
    locationTo?: string;
}

const orderModalVariants: Record<OrderStatus, OrderModalVariant> = {
    "is processed": {
        orderStatus: "is processed",
        headerText: "Your order has been received",
        footerText: "Your order is currently being processed. You will receive an order confirmation email shortly with the expected delivery date for your items.",
        buttonText: "Continue Shopping",
        locationTo: "/home"
    },
    "in transit": {
        orderStatus: "in transit",
        headerText: "Your order is on the way!",
        footerText: "Your order has been shipped and is on its way to you. You can track your package using the tracking number provided in your shipping confirmation email.",
        buttonText: "Leave Review",
    },
    "delivered": {
        orderStatus: "delivered",
        headerText: "Your order has been delivered!",
        footerText: "We hope you're enjoying your purchase! If you have any questions about your order or need assistance, please don't hesitate to contact our customer support team.",
        buttonText: "Leave Review",
    }
};

const orderAdminModalVariants: Record<OrderStatus, OrderModalVariant> = {
    "is processed": {
        orderStatus: "is processed",
        headerText: "This order has been received",
        footerText: "This order is currently being processed.",
        buttonText: "Leave Review",
    },
    "in transit": {
        orderStatus: "in transit",
        headerText: "This order is on the way!",
        footerText: "This order has been shipped and is on its way to customer.",
        buttonText: "Leave Review",
    },
    "delivered": {
        orderStatus: "delivered",
        headerText: "This order has been delivered!",
        footerText: "This order has been delivered to customer.",
        buttonText: "Leave Review",
    }
};

const OrderModal = ({ order, isOpen, onClose, isUserModal = true }: OrderModalProps) => {
    const modalVariant = isUserModal
        ? orderModalVariants[order.status] || orderModalVariants["is processed"]
        : orderAdminModalVariants[order.status] || orderAdminModalVariants["is processed"];

    const navigate = useNavigate();

    const handleButtonClick = () => {
        onClose();
        if (modalVariant.locationTo) { navigate(modalVariant.locationTo) }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles['header-container']}>
                <div className={styles['header-container__header']}>
                    <img src={thankYouImage} alt='Thank you'/>
                    <p className={styles['header-container__header-text']}>{modalVariant.headerText}</p>
                </div>
                <div className={styles['header-container__header-info-container']}>
                    <table className={styles["header-info-container__order-info-table"]}>
                        <tbody>
                        <tr className={styles['order-info-table__row']}>
                            {prepareOrderDateForTable(order).map((item, index) => (
                                <td key={index} className={styles['order-info-table__cell']}>
                                    <span className={styles['order-info-table__cell-label']}>{item.label}</span>
                                    <span className={styles['order-info-table__cell-value']}>{item.value}</span>
                                </td>
                            ))}
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={styles['order-modal-content']}>
                <h3 className={styles['order-modal-content__content-title']}>Order details</h3>
                <CartViewer
                    className={styles['order-modal-content__orders-viewer']}
                    plants={order.plants}
                    isShortMode={true}
                />

                {/* Добавлен блок с информацией о пользователе для админа */}
                {!isUserModal && (
                    <div className={styles['user-info-container']}>
                        <h4 className={styles['user-info-container__title']}>Customer Information</h4>
                        <table className={styles['user-info-container__table']}>
                            <tbody>
                            <tr>
                                <td className={styles['user-info-table__cell']}>Name:</td>
                                <td className={styles['user-info-table__cell-value']}>{order.firstName} {order.lastName}</td>
                            </tr>
                            <tr>
                                <td className={styles['user-info-table__cell']}>Email:</td>
                                <td className={styles['user-info-table__cell-value']}>{order.email}</td>
                            </tr>
                            {order.phone && (
                                <tr>
                                    <td className={styles['user-info-table__cell']}>Phone:</td>
                                    <td className={styles['user-info-table__cell-value']}>{order.phone}</td>
                                </tr>
                            )}
                            <tr>
                                <td className={styles['user-info-table__cell']}>Address:</td>
                                <td className={styles['user-info-table__cell-value']}>
                                    {order.country}, {order.city}, {order.address}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                )}

                <p className={styles['order-modal-content__footer-text']}>
                    {modalVariant.footerText}
                </p>
                <DarkGreenButton
                    onClick={handleButtonClick}
                    className={styles['order-modal-content__button']}
                >
                    {modalVariant.buttonText}
                </DarkGreenButton>
            </div>
        </Modal>
    );
};

export default OrderModal;