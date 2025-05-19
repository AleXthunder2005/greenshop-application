import styles from './styles/style.module.css'
import {CheckoutModule} from "@modules/checkout-module";
import {useState} from "react";
import {OrderManagerModule} from "@modules/order-manager-module";
import {BillingFormData, FullOrderData} from "@/types/order.types.ts";
import {calculateDeliveryDate, generateOrderNumber} from "@/helpers/order.helpers.ts";
import {OrderedPlantData} from "@/types/plants.types.ts";

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
    },
    {
        id: 4, // Предполагаемый ID
        name: "sddfdsf",
        price: 229.00,
        sale: 13,
        image: "../../assets/plants/plant_3/plant_3.png",
        quantity: 1,
    },
    {
        id: 5, // Предполагаемый ID
        name: "bbbbbbbbb",
        price: 229.00,
        sale: 13,
        image: "../../assets/plants/plant_3/plant_3.png",
        quantity: 1,
    }

];

const CheckoutPage = () => {

    const [orderData, setOrderData] = useState<FullOrderData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOrderSubmit = (formData: BillingFormData) => {
        // 1. Собираем полные данные заказа
        const fullOrder : FullOrderData = {
            ...formData,
            plants: plantsInCart,
            orderNumber: generateOrderNumber(),
            deliveryDate: calculateDeliveryDate(),
            paymentMethod: "Cash on delivery"
        };

        // 2. Передаем в OrderManager
        setOrderData(fullOrder);
        setIsModalOpen(true);
    };

    return (
        <div className={styles['checkout-page-container']}>
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