import styles from './styles/styles.module.css';
import { PlantsViewer } from "@components/plants-viewer";
import { PlantCardData } from "@/types/plants.types.ts";
import { PlantsEditorModal } from "@components/plants-editor-modal";
import { useState, useEffect } from "react";
import { fetchPlants, addPlant, updatePlant, deletePlant } from "@/services/plantService.ts";
import { Loader } from "@ui/loader";
import {DarkGreenButton} from "@ui/dark-green-button";

const PlantsAdministrator = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedPlant, setEditedPlant] = useState<PlantCardData | null>(null);
    const [plantsData, setPlantsData] = useState<PlantCardData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const closeModal = () => {
        setIsModalOpen(false);
        setEditedPlant(null);
    };

    useEffect(() => {
        const loadPlants = async () => {
            setIsLoading(true);
            try {
                const data = await fetchPlants();
                setPlantsData(data);
            } catch (err) {
                setError('Failed to load plants. Please try again later.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        loadPlants();
    }, []);

    const handleCardClick = (plantId: string) => {
        const plantToEdit = plantsData.find(plant => plant.id === plantId);
        if (plantToEdit) {
            setEditedPlant({
                ...plantToEdit,
                category: plantToEdit.category || '',
                shortDescription: plantToEdit.shortDescription || '',
                size: plantToEdit.size || 'Small',
            });
            setIsModalOpen(true);
        }
    };

    const handleSavePlant = async (plantData: PlantCardData) => {
        try {
            if (plantData.id) {
                await updatePlant(plantData.id, {
                    name: plantData.name,
                    price: plantData.price,
                    sale: plantData.sale,
                    category: plantData.category,
                    shortDescription: plantData.shortDescription,
                    size: plantData.size
                });

                setPlantsData(prev => prev.map(plant =>
                    plant.id === plantData.id ? { ...plant, ...plantData } : plant
                ));
            } else {
                const newPlant = await addPlant({
                    name: plantData.name,
                    price: plantData.price,
                    sale: plantData.sale,
                    category: plantData.category,
                    shortDescription: plantData.shortDescription,
                    size: plantData.size
                });

                setPlantsData(prev => [...prev, {
                    ...newPlant,
                    images: []
                }]);
            }
            closeModal();
        } catch (error) {
            console.error('Failed to save plant:', error);
        }
    };

    const handleDeletePlant = async (plantId: string) => {
        try {
            await deletePlant(plantId);
            setPlantsData(prev => prev.filter(plant => plant.id !== plantId));
            closeModal();
        } catch (error) {
            console.error('Failed to delete plant:', error);
        }
    };

    const handleAddNewPlant = () => {
        setEditedPlant({
            id: '',
            name: '',
            price: 0,
            sale: undefined,
            category: '',
            shortDescription: '',
            size: 'Small',
            images: []
        });
        setIsModalOpen(true);
    };

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles['plants-administrator']}>
            <div className={styles['plants-administrator__header']}>
                <h1 className={styles['plantsAdministrator__header-title']}>Plants Management</h1>
                <DarkGreenButton
                    onClick={handleAddNewPlant}
                    className={styles['add-new-button']}
                >
                    Add New Plant
                </DarkGreenButton>
            </div>

            <PlantsViewer
                plants={plantsData}
                onCardClick={handleCardClick}
            />

            <PlantsEditorModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSave={handleSavePlant}
                onDelete={handleDeletePlant}
                initialPlant={editedPlant?.id ? editedPlant : undefined}
            />
        </div>
    );
};

export default PlantsAdministrator;