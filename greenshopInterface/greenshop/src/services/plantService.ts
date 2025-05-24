import {PlantCardData, PlantData} from "@/types/plants.types";
import {API_BASE_URL} from "@/configures/server.config.ts";

export const fetchPlants = async (): Promise<PlantCardData[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/plants`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Преобразуем данные с бэкенда в формат PlantCardData
        return data.map((plant) => ({
            id: plant.id,
            name: plant.name,
            price: plant.price,
            sale: plant.sale,
            category: plant.category,
            size: plant.size,
            images: []
            // images: [`../../assets/plants/plant_${plant.id}/plant_${plant.id}.png`] // Пример пути к изображениям
        }));
    } catch (error) {
        console.error('Error fetching plants:', error);
        return [];
    }
};

export const fetchPlantById = async (id: string): Promise<PlantData> => {
    const response = await fetch(`${API_BASE_URL}/plants/${id}`);
    if (!response.ok) {
        throw new Error('Plant not found');
    }
    return response.json();
};