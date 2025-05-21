import  styles from './styles/styles.module.css'
import {PlantsViewer} from "@components/plants-viewer";
import {DBPlant, PlantCardData} from "@/types/plants.types.ts";
import {PlantsEditorModal} from "@components/plants-editor-modal";
import React, {useState} from "react";

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

const PlantsAdministrator = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(true);
    const closeModal = () => setIsModalOpen(false);
    const [editedPlant, setEditedPlant] = useState<DBPlant | null>(null)


    return (
        <div className={styles['plants-administrator']}>
            <PlantsViewer plants={plantsData}/>
            <PlantsEditorModal isOpen={isModalOpen} onClose={closeModal} onSave={setEditedPlant} />
            {editedPlant && (<></>)}{/*Заглушка*/}
        </div>
    );
};

export default PlantsAdministrator;