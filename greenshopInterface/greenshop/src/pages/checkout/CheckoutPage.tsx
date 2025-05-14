import styles from './styles/style.module.css'
import {Checkout} from "@modules/checkout";
import {CartModule} from "@modules/cart-module";
import { PlantInCartOptions } from '@components/cart-viewer';

const plantsInCart: PlantInCartOptions[] = [
    {
        id: 1,
        name: "Barberton Daisy",
        price: 119.00,
        sale: 13,
        salePrice: 103.53, // 0.87 * 119.00
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
        salePrice: 199.00,
        image: "../../assets/plants/plant_3/plant_3.png",
        quantity: 1,
    }
];

const CheckoutPage = () => {
    return (
        <div className={styles['checkout-page-container']}>
            <Checkout/>
            <div className={styles['checkout-page-container__cart-container']}>
                <h2 className={styles['cart-container__title']}>Your Order</h2>
                <CartModule initialPlants={plantsInCart} isShortMode={true}/>
            </div>

        </div>
    );
};

export default CheckoutPage;