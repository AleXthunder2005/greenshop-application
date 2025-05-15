import {useState} from 'react';
import styles from './styles/style.module.css';
import {CartViewer, PlantInCartOptions} from "@components/cart-viewer";
import {CartTotals} from "@components/cart-totals";
import {DarkGreenButton} from "@ui/dark-green-button";

interface CartModuleProps {
    initialPlants: PlantInCartOptions[];
    isShortMode?: boolean;
}

const CartModule = ({ initialPlants, isShortMode = false }: CartModuleProps) => {
    const [plants, setPlants] = useState<PlantInCartOptions[]>(
        initialPlants.map(plant => ({
            ...plant,
            quantity: 1
        }))
    );
    //
    // const [totalPrice, setTotalPrice] = useState<number>(0);
    // console.log(totalPrice);

    const handleQuantityChange = (id: number, newQuantity: number) => {
        setPlants(prevPlants =>
            prevPlants.map(plant =>
                plant.id === id ? { ...plant, quantity: newQuantity } : plant
            )
        );
    };

    const handleRemove = (id: number) => {
        setPlants(prevPlants => prevPlants.filter(plant => plant.id !== id));
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
                <CartTotals
                    plants={plants}
                />

                <div className={styles['cart-totals-container__buttons-container']}>
                    <DarkGreenButton className={styles['buttons-container__accept-button']}>Proceed To Checkout</DarkGreenButton>
                    <a href='##' className={styles['buttons-container__continue-shopping-button']}>Continue Shopping</a>
                </div>
            </div>
        </div>
    );
};

export default CartModule;