import {OrderModal} from "@components/order-modal";
import {OrderData} from "@/types/order.types.ts";

interface OrderManagerModuleProps {
    orderData: OrderData;
    isOpen: boolean;
    onClose: () => void;
}

const OrderManagerModule = ({orderData, isOpen, onClose}: OrderManagerModuleProps) => {
    //По идее отправка должна быть здесь, принимаем тут только BillingFormData и plants

    return (
        <OrderModal
            order={orderData}
            isOpen={isOpen}
            onClose={onClose}
        />
    );
};

export default OrderManagerModule;