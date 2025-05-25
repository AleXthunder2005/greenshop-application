import styles from './styles/style.module.css';
import { CartViewer } from "@components/cart-viewer";
import { CartTotals } from "@components/cart-totals";
import { DarkGreenButton } from "@ui/dark-green-button";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/cart-context/CartContext.tsx";

interface CartModuleProps {
    isShortMode?: boolean;
}

const CartModule = ({ isShortMode = false }: CartModuleProps) => {
    const { cart: plants, dispatch } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/checkout');
    };

    const handleQuantityChange = (id: string, newQuantity: number) => {
        dispatch({
            type: 'UPDATE_QUANTITY',
            payload: { id, quantity: newQuantity }
        });
    };

    const handleRemove = (id: string) => {
        dispatch({
            type: 'REMOVE_ITEM',
            payload: id
        });
    };

    return (
        <div className={`${styles['cart-module-container']} ${isShortMode ? styles['short-cart'] : ''}`}>
            <CartViewer
                isShortMode={isShortMode}
                plants={plants}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemove}
            />

            <div className={styles['cart-totals-container']}>
                <CartTotals plants={plants} />

                <div className={styles['cart-totals-container__buttons-container']}>
                    <DarkGreenButton
                        className={styles['buttons-container__accept-button']}
                        onClick={handleCheckout}
                    >
                        Proceed To Checkout
                    </DarkGreenButton>
                    <a href='/home' className={styles['buttons-container__continue-shopping-button']}>
                        Continue Shopping
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CartModule;