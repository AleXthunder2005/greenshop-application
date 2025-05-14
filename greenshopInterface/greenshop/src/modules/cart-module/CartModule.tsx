import {useMemo, useState} from 'react';
import styles from './styles/style.module.css';
import {CartViewer, PlantInCartOptions} from "@components/cart-viewer";
import {CartTotals} from "@components/cart-totals";

interface CartModuleProps {
    initialPlants: PlantInCartOptions[];
}

const CartModule = ({ initialPlants }: CartModuleProps) => {
    const [plants, setPlants] = useState<PlantInCartOptions[]>(
        initialPlants.map(plant => ({
            ...plant,
            quantity: 1
        }))
    );

    const calculateTotalPrice = (plants: PlantInCartOptions[]) => {
        return plants.reduce((total, plant) => {
            return total + ((plant.salePrice || plant.price) * plant.quantity);
        }, 0);
    };


    const totalPrice = useMemo(() => calculateTotalPrice(plants), [plants]);

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
        <div className={styles['cart-module-container']}>
            <CartViewer
                plants={plants}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemove}
            />

            <CartTotals totalPrice={totalPrice}/>
        </div>
    );
};

export default CartModule;