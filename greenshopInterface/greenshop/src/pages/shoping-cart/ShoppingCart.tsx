// import styles from './styles/style.module.css'
import {CartModule} from "@modules/cart-module";
import {OrderedPlantData} from "@/types/plants.types.ts";

const plantsInCart: OrderedPlantData[] = [
    {
        id: 1,
        name: "Barberton Daisy",
        price: 119.00,
        sale: 13,
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
        image: "../../assets/plants/plant_3/plant_3.png",
        quantity: 1,
    }
];

const ShoppingCart = () => {
    return (
        <div>
            <CartModule orderedPlants={plantsInCart} />
        </div>
    );
};

export default ShoppingCart;