import { FilterByCategories } from '@/components/filter-by-category';
import styles from './styles/style.module.css'
import { FilterBySize } from '@/components/filter-by-size';
import FilterByPrice from "@components/filter-by-price/FilterByPrice.tsx";

const categoriesData = [
    { category: "House Plants", count: 33 },
    { category: "Potter Plants", count: 12 },
    { category: "Seeds", count: 65 },
    { category: "Small Plants", count: 39 },
    { category: "Big Plants", count: 23 },
    { category: "Succulents", count: 17 },
    { category: "Terrariums", count: 19 },
    { category: "Gardening", count: 13 },
    { category: "Accessories", count: 18 }
  ];
const sizesData = [
    { size: "Small", count: 119 },
    { size: "Medium", count: 86 },
    { size: "Large", count: 78 }
  ];

export function Filter() {
    return (
        <div className={styles['filter-container']}>
            <FilterByCategories categories={categoriesData}/>
            <FilterByPrice/>
            <FilterBySize sizes={sizesData}/>
        </div>
    );
}