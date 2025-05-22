import { useState, useEffect } from 'react';
import styles from './styles/style.module.css';
import { PlantsViewer } from "@components/plants-viewer";
import { Filter } from "@modules/filter";
import { PlantCardData } from "@/types/plants.types.ts";

interface PlantsModuleProps {
    withFilters?: boolean;
}

interface FilterState {
    category?: string;
    priceRange?: [number, number];
    size?: string;
}

const PlantsModule = ({ withFilters = true }: PlantsModuleProps) => {
    const [plantsData, setPlantsData] = useState<PlantCardData[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantCardData[]>([]);
    const [filterState, setFilterState] = useState<FilterState>({});
    const [categories, setCategories] = useState<{ category: string; count: number }[]>([]);
    const [sizes, setSizes] = useState<{ size: string; count: number }[]>([]);

    // Simulate fetching data from backend
    useEffect(() => {
        const fetchPlants = async () => {
            const mockData: PlantCardData[] = [
                {
                    id: 1,
                    name: "Barberton Daisy",
                    images: ["../../assets/plants/plant_1/plant_1.png"],
                    price: 119.00,
                    category: "House Plants",
                    size: "Small"
                },
                {
                    id: 2,
                    name: "Angel Wing Begonia",
                    images: ["../../assets/plants/plant_2/plant_2.png"],
                    price: 169.00,
                    category: "Potter Plants",
                    size: "Medium"
                },
                {
                    id: 3,
                    name: "African Violet",
                    images: ["../../assets/plants/plant_3/plant_3.png"],
                    price: 229.00,
                    sale: 13,
                    category: "House Plants",
                    size: "Large"
                },
            ];

            setPlantsData(mockData);
            setFilteredPlants(mockData);

            const categoryCounts: Record<string, number> = {};
            const sizeCounts: Record<string, number> = {};

            mockData.forEach(plant => {
                if (plant.category) {
                    categoryCounts[plant.category] = (categoryCounts[plant.category] || 0) + 1;
                }
                if (plant.size) {
                    sizeCounts[plant.size] = (sizeCounts[plant.size] || 0) + 1;
                }
            });

            setCategories(Object.entries(categoryCounts).map(([category, count]) => ({ category, count })));
            setSizes(Object.entries(sizeCounts).map(([size, count]) => ({ size, count })));
        };

        fetchPlants();
    }, []);

    // Apply filters when filterState changes
    useEffect(() => {
        let result = [...plantsData];

        if (filterState.category) {
            result = result.filter(plant => plant.category === filterState.category);
        }

        if (filterState.size) {
            result = result.filter(plant => plant.size === filterState.size);
        }

        if (filterState.priceRange) {
            const [minPrice, maxPrice] = filterState.priceRange;
            result = result.filter(plant => plant.price >= minPrice && plant.price <= maxPrice);
        }

        setFilteredPlants(result);
    }, [filterState, plantsData]);

    const handleCategoryChange = (category: string) => {
        setFilterState({
            category, // Устанавливаем только категорию, остальные фильтры сбрасываем
            priceRange: undefined,
            size: undefined
        });
    };

    const handleSizeChange = (size: string) => {
        setFilterState({
            size, // Устанавливаем только размер, остальные фильтры сбрасываем
            category: undefined,
            priceRange: undefined
        });
    };

    const handlePriceChange = (priceRange: [number, number]) => {
        setFilterState({
            priceRange, // Устанавливаем только цену, остальные фильтры сбрасываем
            category: undefined,
            size: undefined
        });
    };

    return (
        <div className={styles['plants-module-container']}>
            {withFilters && (
                <Filter
                    categories={categories}
                    sizes={sizes}
                    onCategoryChange={handleCategoryChange}
                    onSizeChange={handleSizeChange}
                    onPriceChange={handlePriceChange}
                    currentFilters={filterState} // Передаем текущие фильтры для сброса UI
                />
            )}
            <div className={styles['plants-viewer-container']}>
                <PlantsViewer plants={filteredPlants} />
            </div>
        </div>
    );
};

export default PlantsModule;