import styles from './styles/styles.module.css'

import {PlantCardData} from "@/types/plants.types.ts";
import {PlantsViewer} from "@components/plants-viewer";

const likedPlants: PlantCardData[] = [
    {
        id: 1,
        name: "Barberton Daisy",
        images: ["../../assets/plants/plant_1/plant_1.png"], // или ваш путь к изображению
        price: 119.00,
    },
    {
        id: 2,
        name: "Angel Wing Begonia",
        images: ["../../assets/plants/plant_2/plant_2.png"],
        price: 169.00,
    }
];

const WishlistModule = () => {
    return (
        <div className={styles['wishlist']}>
            <PlantsViewer plants={likedPlants} />
        </div>
    );
};

export default WishlistModule;