import {OrderData} from "@/types/order.types.ts";
import {formatPrice} from "@/helpers/plant.helpers.ts";
import {calculateTotalPrice, formatOrderNumber} from "@/helpers/order.helpers.ts";
import {formatDate} from "@/helpers/date.helpers.ts";

export const prepareOrderDateForTable = (order : OrderData) => {
    return [
        {label: 'Order Number', value: formatOrderNumber(order.orderNumber)},
        {label: 'Date', value: formatDate(order.deliveryDate)},
        {label: 'Total', value: (formatPrice(calculateTotalPrice(order.plants)))},
        {label: 'Payment Method', value: order.paymentMethod}
    ];
}