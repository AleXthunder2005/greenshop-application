import styles from './styles/style.module.css'
import {PlantCard} from "@ui/plant-card";
import {PlantCardData} from "@/types/plants.types.ts";
import {Pagination} from "@components/pagination";
import {useState} from "react";

interface PlantsViewerProps {
    plants: PlantCardData[];
    itemsPerPage?: number;
    onCardClick?: (id: string) => void; // Уточняем тип
}

const PlantsViewer = ({ plants, itemsPerPage = 6, onCardClick }: PlantsViewerProps) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(plants.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPlants = plants.slice(startIndex, endIndex);

    // Обработчик клика по карточке
    const handleCardClick = (id: string) => {
        if (onCardClick) {
            onCardClick(id);
        }
    };

    return (
        <div className={styles['plants-viewer']}>
            <div className={styles['plants-viewer-container']}>
                {currentPlants.map((plant: PlantCardData) => (
                    <PlantCard
                        key={plant.id}
                        plant={plant}
                        onClick={handleCardClick} // Правильно передаем обработчик
                    />
                ))}
            </div>
            {totalPages > 1 && (
                <div className={styles['pagination-container']}>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            )}
        </div>
    );
};

export default PlantsViewer;