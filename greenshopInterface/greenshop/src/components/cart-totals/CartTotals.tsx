import styles from './styles/style.module.css'
import {PlantInCartOptions} from "@components/cart-viewer";
import {useMemo} from "react";

interface CartTotalsProps {
    plants: PlantInCartOptions[];
    onTotalPriceChanged?: () => void;
}

const CartTotals = ({plants} : CartTotalsProps) => {
    const formatPrice = (price: number) => price.toFixed(2)
    const calculateTotalPrice = (plants: PlantInCartOptions[]) => {
        const currTotalPrice = plants.reduce((total, plant) => {
            return total + ((plant.salePrice || plant.price) * plant.quantity);
        }, 0);
        // onTotalPriceChanged(currTotalPrice);
        return currTotalPrice;
    };


    const totalPrice = useMemo(() => calculateTotalPrice(plants), [plants]);
    return (
        <div className={styles['cart-totals-container']}>
            <h3 className={styles['cart-totals-container__title']}>Cart Totals</h3>
            <div className={styles['cart-totals-container__total-container']}>
                <h4 className={styles['total-container__title']}>Total</h4>
                <p className={styles['total-container__value']}>{`$${formatPrice(totalPrice)}`}</p>
            </div>
        </div>
    );
};

export default CartTotals;