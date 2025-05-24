import styles from './styles/style.module.css';
import { CheckoutModule } from '@modules/checkout-module';
import { useState } from 'react';
import { OrderManagerModule } from '@modules/order-manager-module';
import { BillingFormData, FullOrderData } from '@/types/order.types.ts';
import {calculateDeliveryDate, calculateTotalPrice, generateOrderNumber} from '@/helpers/order.helpers.ts';
import { useCart } from '@/contexts/cart-context/CartContext.tsx';
import { useAuth } from '@/contexts/auth-context/AuthContext.tsx';
import { addOrder } from '@/services/orderService';

const CheckoutPage = () => {
    const { cart: plantsInCart } = useCart();
    const { userId } = useAuth();
    const [orderData, setOrderData] = useState<FullOrderData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState<{text: string, isError: boolean} | null>(null);

    const handleOrderSubmit = async (formData: BillingFormData) => {
        if (!userId) {
            setMessage({text: 'User not authenticated', isError: true});
            return;
        }

        if (plantsInCart.length === 0) {
            setMessage({text: 'Cart is empty', isError: true});
            return;
        }

        // 1. Собираем данные для API
        const orderRequest = {
            userId,
            plants: plantsInCart.map(plant => ({
                plantId: plant.id.toString(),
                quantity: plant.quantity
            }))
        };

        // 2. Отправляем заказ
        setMessage(null);
        const result = await addOrder(orderRequest);

        if (result.success) {
            // 3. Если успешно, собираем полные данные для модалки
            const fullOrder: FullOrderData = {
                ...formData,
                plants: plantsInCart,
                orderNumber: result.orderId || '',
                deliveryDate: calculateDeliveryDate(),
                paymentMethod: 'Cash on delivery',
                total: calculateTotalPrice(plantsInCart),
                status: 'is processed'
            };

            setOrderData(fullOrder);
            setIsModalOpen(true);
        } else {
            setMessage({
                text: result.error || 'Failed to create order',
                isError: true
            });
        }
    };

    return (
        <div className={styles['checkout-page-container']}>
            {message && (
                <div className={`${styles['message-container']} ${
                    message.isError ? styles['error'] : styles['success']
                }`}>
                    {message.text}
                </div>
            )}

            <CheckoutModule
                plants={plantsInCart}
                onSubmit={handleOrderSubmit}
            />

            {orderData && (
                <OrderManagerModule
                    orderData={orderData}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default CheckoutPage;