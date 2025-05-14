import styles from './styles/style.module.css'
import {DarkGreenButton} from "@ui/dark-green-button";

interface CartTotalsProps {
    totalPrice: number;
    isShortMode?: boolean;
}

const CartTotals = ({totalPrice, isShortMode = false} : CartTotalsProps) => {
    const formatPrice = (price: number) => price.toFixed(2)

    return (
        <div className={styles['cart-totals-container']}>
            <h3 className={styles['cart-totals-container__title']}>Cart Totals</h3>
            <div className={styles['cart-totals-container__total-container']}>
                <h4 className={styles['total-container__title']}>Total</h4>
                <p className={styles['total-container__value']}>{`$${formatPrice(totalPrice)}`}</p>
            </div>
            {isShortMode
                ?
                (<div className={styles['cart-totals-container__buttons-container']}>
                    <DarkGreenButton className={styles['buttons-container__accept-button']}>Accept order</DarkGreenButton>
                    <a href='##' className={styles['buttons-container__continue-shopping-button']}>Continue Shopping</a>
                </div>)
                :
                (<div className={styles['cart-totals-container__buttons-container']}>
                    <DarkGreenButton className={styles['buttons-container__accept-button']}>Proceed To Checkout</DarkGreenButton>
                    <a href='##' className={styles['buttons-container__continue-shopping-button']}>Continue Shopping</a>
                </div>)
            }
        </div>
    );
};

export default CartTotals;