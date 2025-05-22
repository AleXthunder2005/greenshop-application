import {OrderModal} from "@components/order-modal";
import {DBOrder, OrderData} from "@/types/order.types.ts";
import {calculateTotalPrice} from "@/helpers/order.helpers.ts";

interface OrderManagerModuleProps {
    orderData: OrderData;
    isOpen: boolean;
    onClose: () => void;
}

const OrderManagerModule = ({orderData, isOpen, onClose}: OrderManagerModuleProps) => {
    //По идее отправка должна быть здесь, принимаем тут только BillingFormData и plants

    const preparedOrderData :DBOrder = {
        ...orderData,
        status: "is processed",
        total: calculateTotalPrice(orderData.plants)
    };

    return (
        <OrderModal
            order={preparedOrderData}
            isOpen={isOpen}
            onClose={onClose}
        />
    );
};

export default OrderManagerModule;