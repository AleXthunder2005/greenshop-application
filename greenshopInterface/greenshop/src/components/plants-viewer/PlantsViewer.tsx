import styles from './styles/style.module.css'
import {PlantCard} from "@ui/plant-card";
import {PlantCardData} from "@/types/plants.types.ts";
import {Pagination} from "@components/pagination";
import {useState} from "react";

interface PlantsViewerProps {
    plants: PlantCardData[];
    itemsPerPage?: number; // Добавляем опциональный параметр для количества элементов на странице
}

const PlantsViewer = ({ plants, itemsPerPage = 6 }: PlantsViewerProps) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Вычисляем общее количество страниц
    const totalPages = Math.ceil(plants.length / itemsPerPage);

    // Получаем растения для текущей страницы
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPlants = plants.slice(startIndex, endIndex);

    return (
        <div className={styles['plants-viewer']}>
            <div className={styles['plants-viewer-container']}>
                {currentPlants.map((plant: PlantCardData) => (
                    <PlantCard
                        key={plant.id}
                        plant={plant}
                    />
                ))}
            </div>
            {totalPages > 1 && ( // Показываем пагинацию только если страниц больше одной
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