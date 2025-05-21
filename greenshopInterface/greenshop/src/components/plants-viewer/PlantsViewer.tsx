import styles from './styles/style.module.css'
import {PlantCard} from "@ui/plant-card";
import {PlantCardData} from "@/types/plants.types.ts";
import {Pagination} from "@components/pagination";
import {useState} from "react";

interface PlantsViewerProps {
    plants: PlantCardData[];
}

const PlantsViewer = ({ plants }: PlantsViewerProps) => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className={styles['plants-viewer']}>
            <div className={styles['plants-viewer-container']}>
                {plants.map((plant: PlantCardData) => (
                    <PlantCard
                        key={plant.id}
                        plant={plant}
                    />
                ))}
            </div>
            <div className={styles['pagination-container']}>
                <Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} />
            </div>
        </div>
    );
};

export default PlantsViewer;