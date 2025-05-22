import { FilterByCategories } from '@/components/filter-by-category';
import styles from './styles/style.module.css';
import { FilterBySize } from '@/components/filter-by-size';
import FilterByPrice from "@components/filter-by-price/FilterByPrice.tsx";

export interface FilterState {
    category?: string;
    priceRange?: [number, number];
    size?: string;
}

interface FilterProps {
    categories: { category: string; count: number }[];
    sizes: { size: string; count: number }[];
    onCategoryChange: (category: string) => void;
    onSizeChange: (size: string) => void;
    onPriceChange: (priceRange: [number, number]) => void;
    currentFilters: FilterState; // Добавляем текущие фильтры
}

export function Filter({
                           categories,
                           sizes,
                           onCategoryChange,
                           onSizeChange,
                           onPriceChange,
                           currentFilters
                       }: FilterProps) {
    return (
        <div className={styles['filter-container']}>
            <FilterByCategories
                categories={categories}
                onCategoryChange={onCategoryChange}
                activeCategory={currentFilters.category} // Передаем активную категорию
            />
            <FilterByPrice
                onPriceChange={onPriceChange}
                currentRange={currentFilters.priceRange} // Передаем текущий диапазон
            />
            <FilterBySize
                sizes={sizes}
                onSizeChange={onSizeChange}
                activeSize={currentFilters.size} // Передаем активный размер
            />
        </div>
    );
}