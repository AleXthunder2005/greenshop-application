import styles from './styles/style.module.css'
import {useMemo} from "react";
import {OrderedPlantData} from "@/types/plants.types.ts";
import {formatPrice} from "@/helpers/plant.helpers.ts";
import {calculateTotalPrice} from "@/helpers/order.helpers.ts";

interface CartTotalsProps {
    plants: OrderedPlantData[];
    onTotalPriceChanged?: () => void;
}

const CartTotals = ({plants} : CartTotalsProps) => {
    const totalPrice = useMemo(() => calculateTotalPrice(plants), [plants]);
    return (
        <div className={styles['cart-totals-container']}>
            <h3 className={styles['cart-totals-container__title']}>Cart Totals</h3>
            <div className={styles['cart-totals-container__total-container']}>
                <h4 className={styles['total-container__title']}>Total</h4>
                <p className={styles['total-container__value']}>{`${formatPrice(totalPrice)}`}</p>
            </div>
        </div>
    );
};

export default CartTotals;