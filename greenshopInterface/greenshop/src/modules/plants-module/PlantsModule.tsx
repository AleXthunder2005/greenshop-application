import styles from './styles/style.module.css'
import {PlantsViewer} from "@components/plants-viewer";
import {Filter} from "@modules/filter";
import {PlantCardData} from "@/types/plants.types.ts";
const plantsData: PlantCardData[] = [
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
    },
    {
        id: 3,
        name: "African Violet",
        images: ["../../assets/plants/plant_3/plant_3.png"],
        price: 229.00,
        sale: 13,
    }
];

interface PlantsModuleProps {
    withFilters? : boolean;
}

const PlantsModule = ({withFilters = true} : PlantsModuleProps) => {
    return (
        <div className={styles['plants-module-container']}>
            {withFilters && (<Filter/>)}
            <div className={styles['plants-viewer-container']}>
                <PlantsViewer plants={plantsData}/>
            </div>
        </div>
    );
};

export default PlantsModule;