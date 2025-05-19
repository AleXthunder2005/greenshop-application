import styles from './styles/style.module.css'
import {PlantCard} from "@ui/plant-card";
import {PlantCardData} from "@/types/plants.types.ts";

interface PlantsViewerProps {
    plants: PlantCardData[];
}

const PlantsViewer = ({ plants }: PlantsViewerProps) => {
    return (
        <div className={styles['plants-viewer-container']}>
            {plants.map((plant: PlantCardData) => (
                <PlantCard
                    key={plant.id}
                    plant={plant}
                />
            ))}
        </div>
    );
};

export default PlantsViewer;