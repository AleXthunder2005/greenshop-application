import styles from './styles/style.module.css'
import {PlantsViewer} from "@components/plants-viewer";
import {Filter} from "@modules/filter";
import {useState} from "react";
import {Pagination} from "@components/pagination";
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
    likedPlants?: PlantCardData[];
}

const PlantsModule = ({withFilters = true, likedPlants} : PlantsModuleProps) => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className={styles['plants-module-container']}>
            {withFilters && (<Filter/>)}
            <div className={styles['plants-viewer-container']}>
                <PlantsViewer plants={likedPlants || plantsData}/>
                <div className={styles['pagination-container']}>
                    <Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} />
                </div>
            </div>
        </div>
    );
};

export default PlantsModule;