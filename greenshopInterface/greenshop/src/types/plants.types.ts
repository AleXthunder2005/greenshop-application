export interface PlantData {
    id: number,
    name: string,
    price: number,
    sale?: number,
    rate: number,
    shortDescription: string,
    size: PlantSize,
    categories: string[],
    images: string[]
}

export interface OrderedPlantData {
    id: number;
    name: string;
    price: number;
    sale?: number;
    image: string;
    quantity: number;
}


export interface PlantCardData {
    id: number;
    name: string;
    price: number;
    sale?: number;
    images: string[];
}
export type PlantSize = 'small' | 'medium' | 'large';
