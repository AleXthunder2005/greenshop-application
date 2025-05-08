import styles from './styles/style.module.css'
import {PlantCard, PlantCardInfo} from "@ui/plant-card";

interface PlantsViewerProps {
    plants: PlantCardInfo[];
}

const PlantsViewer = ({ plants }: PlantsViewerProps) => {
    return (
        <div className={styles['plants-viewer-container']}>
            {plants.map((plant: PlantCardInfo) => (
                <PlantCard
                    key={plant.name}
                    name={plant.name}
                    iconPath={plant.iconPath}
                    price={plant.price}
                    sale={plant.sale}
                    salePrice={plant.salePrice}
                />
            ))}
        </div>
    );
};

export default PlantsViewer;