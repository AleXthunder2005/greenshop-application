import styles from './styles/style.module.css'
import {PlantCardInfo} from "@ui/plant-card";
import {PlantsViewer} from "@components/plants-viewer";
import {Filter} from "@modules/filter";
import {useState} from "react";
import {Pagination} from "@components/pagination";
const plantsData: PlantCardInfo[] = [
    {
        name: "Barberton Daisy",
        iconPath: "../../assets/plants/plant_1/plant_1.png", // или ваш путь к изображению
        price: 119.00,
    },
    {
        name: "Angel Wing Begonia",
        iconPath: "../../assets/plants/plant_2/plant_2.png",
        price: 169.00,
    },
    {
        name: "African Violet",
        iconPath: "../../assets/plants/plant_3/plant_3.png",
        price: 229.00,
        sale: 13,
        salePrice: 199.00
    }
];
const PlantsModule = () => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className={styles['plants-module-container']}>
            <Filter/>
            <div>
                <PlantsViewer plants={plantsData}/>
                <div className={styles['pagination-container']}>
                    <Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} />
                </div>
            </div>
        </div>
    );
};

export default PlantsModule;