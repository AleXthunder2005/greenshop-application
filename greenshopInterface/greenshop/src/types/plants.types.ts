export interface PlantData {
    id: string,
    name: string,
    price: number,
    sale?: number,
    shortDescription: string,
    size: PlantSize,
    category: string
    images?: string[]
}

export interface DBPlant {
    id: string,
    name: string,
    price: number,
    sale?: number,
    rate: number,
    shortDescription: string,
    size: PlantSize,
    category: string,
    images: File[]
}

export interface OrderedPlantData {
    id: string;
    name: string;
    price: number;
    sale?: number;
    image: string;
    quantity: number;
}


export interface PlantCardData {
    id: string;
    name: string;
    price: number;
    category?: string;
    shortDescription?: string;
    size?: PlantSize;
    sale?: number;
    images: string[];
}
export type PlantSize = 'Small' | 'Medium' | 'Large';
export const PLANT_SIZES = ['Small', 'Medium', 'Large'];
