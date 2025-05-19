import {Modal} from "@ui/modal";
import {CartViewer} from "@components/cart-viewer";
import styles from './styles/styles.module.css'
import {DarkGreenButton} from "@ui/dark-green-button";
import thankYouImage from "@components/order-modal/assets/thank-you.svg";
import {OrderData} from "@/types/order.types.ts";
import {prepareOrderDateForTable} from "@components/order-modal/helpers/orderModal.helpers.ts";

interface OrderModalProps {
    order: OrderData;
    isOpen: boolean;
    onClose: () => void;
}

const OrderModal = ({ order, isOpen, onClose }: OrderModalProps) => {
    return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <div className={styles['header-container']}>
                    <div className={styles['header-container__header']}>
                        <img src={thankYouImage} alt='Thank you'/>
                        <p className={styles['header-container__header-text']}>Your order has been received</p>
                    </div>
                    <div className={styles['header-container__header-info-container']}>
                        <table className={styles["header-info-container__order-info-table"]}>
                            <tbody>
                                <tr  className={styles['order-info-table__row']}>
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
                    <CartViewer className={styles['order-modal-content__orders-viewer']} plants={order.plants} isShortMode={true}/>
                    <p className={styles['order-modal-content__footer-text']}>
                        Your order is currently being processed. You will receive an order
                        confirmation email shortly with the expected delivery date for your items.
                    </p>
                    <DarkGreenButton
                        onClick={onClose}
                        className={styles['order-modal-content__button']}
                    >Continue shopping</DarkGreenButton>
                </div>

            </Modal>
    );
};

export default OrderModal;