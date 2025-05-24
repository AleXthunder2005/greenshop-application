import {PlantCardData, PlantData, PlantSize} from "@/types/plants.types";
import axios from 'axios';
import {API_BASE_URL} from "@/configures/server.config.ts";

export const fetchPlants = async (): Promise<PlantCardData[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/plants`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Преобразуем данные с бэкенда в формат PlantCardData
        // @ts-ignore
        return data.map((plant) => ({
            id: plant.id,
            name: plant.name,
            price: plant.price,
            sale: plant.sale,
            category: plant.category,
            shortDescription: plant.shortDescription,
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


export interface PlantAddRequest {
    name: string;
    price: number;
    sale?: number;
    category?: string;
    shortDescription?: string;
    size?: PlantSize;
}

export interface PlantUpdateRequest extends PlantAddRequest {
    id: string;
}

export const addPlant = async (plantData: PlantAddRequest): Promise<PlantCardData> => {
    const response = await axios.post(`${API_BASE_URL}/plants`, plantData);
    return response.data;
};

export const updatePlant = async (id: string, plantData: PlantAddRequest): Promise<PlantCardData> => {
    const response = await axios.put(`${API_BASE_URL}/plants/${id}`, plantData);
    return response.data;
};

export const deletePlant = async (id: string): Promise<void> => {
    const response = await axios.delete(`${API_BASE_URL}/plants/${id}`);
    return response.data;
};