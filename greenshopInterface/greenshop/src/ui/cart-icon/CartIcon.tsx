import styles from './styles/style.module.css'
import cartIcon from './assets/cart-icon.svg';

export function CartIcon() {
    return (
        <img src={cartIcon} alt="cart-icon" className={styles['cart-icon']}/>
    );
}