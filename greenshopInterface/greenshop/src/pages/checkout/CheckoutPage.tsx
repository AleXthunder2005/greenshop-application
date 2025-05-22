import styles from './styles/style.module.css';
import { CheckoutModule } from '@modules/checkout-module';
import { useState } from 'react';
import { OrderManagerModule } from '@modules/order-manager-module';
import { BillingFormData, FullOrderData } from '@/types/order.types.ts';
import { calculateDeliveryDate, generateOrderNumber } from '@/helpers/order.helpers.ts';
import { useCart } from '@/contexts/cart-context/CartContext.tsx';

const CheckoutPage = () => {
    const { cart: plantsInCart } = useCart(); // Получаем корзину из контекста
    const [orderData, setOrderData] = useState<FullOrderData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOrderSubmit = (formData: BillingFormData) => {
        // 1. Собираем полные данные заказа
        const fullOrder: FullOrderData = {
            ...formData,
            plants: plantsInCart, // Используем корзину из контекста
            orderNumber: generateOrderNumber(),
            deliveryDate: calculateDeliveryDate(),
            paymentMethod: 'Cash on delivery',
        };

        // 2. Передаем в OrderManager
        setOrderData(fullOrder);
        setIsModalOpen(true);
    };

    return (
        <div className={styles['checkout-page-container']}>
            <CheckoutModule
                plants={plantsInCart} // Передаем корзину из контекста
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