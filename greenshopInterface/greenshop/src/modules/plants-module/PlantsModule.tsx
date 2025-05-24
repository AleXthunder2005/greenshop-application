import { useState, useEffect } from 'react';
import styles from './styles/style.module.css';
import { PlantsViewer } from "@components/plants-viewer";
import { Filter } from "@modules/filter";
import { PlantCardData } from "@/types/plants.types.ts";
import {fetchPlants} from "@/services/plantService.ts";
import {Loader} from "@ui/loader";
import {useNavigate} from "react-router-dom";

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
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadPlants = async () => {
            setIsLoading(true);
            try {
                const data = await fetchPlants();
                setPlantsData(data);
                setFilteredPlants(data);

                // Генерируем категории и размеры для фильтров
                const categoryCounts: Record<string, number> = {};
                const sizeCounts: Record<string, number> = {};

                data.forEach(plant => {
                    if (plant.category) {
                        categoryCounts[plant.category] = (categoryCounts[plant.category] || 0) + 1;
                    }
                    if (plant.size) {
                        sizeCounts[plant.size] = (sizeCounts[plant.size] || 0) + 1;
                    }
                });

                setCategories(Object.entries(categoryCounts).map(([category, count]) => ({ category, count })));
                setSizes(Object.entries(sizeCounts).map(([size, count]) => ({ size, count })));
            } catch (err) {
                setError('Failed to load plants. Please try again later.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        loadPlants();
    }, []);

    // Применяем фильтры
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
            category,
            priceRange: undefined,
            size: undefined
        });
    };

    const handleSizeChange = (size: string) => {
        setFilterState({
            size,
            category: undefined,
            priceRange: undefined
        });
    };

    const handlePriceChange = (priceRange: [number, number]) => {
        setFilterState({
            priceRange,
            category: undefined,
            size: undefined
        });
    };

    const handleCardClick = (id: string) => {
        navigate(`/shop/${id}`);
    }

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles['plants-module-container']}>
            {withFilters && (
                <Filter
                    categories={categories}
                    sizes={sizes}
                    onCategoryChange={handleCategoryChange}
                    onSizeChange={handleSizeChange}
                    onPriceChange={handlePriceChange}
                    currentFilters={filterState}
                />
            )}
            <div className={styles['plants-viewer-container']}>
                <PlantsViewer plants={filteredPlants} onCardClick={handleCardClick}/>
            </div>
        </div>
    );
};

export default PlantsModule;