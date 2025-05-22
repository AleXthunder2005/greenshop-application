import { DarkGreenButton } from "@ui/dark-green-button";
import { RangeRegulator } from "@ui/range-regulator";
import {useEffect, useState} from 'react';
import styles from './styles/style.module.css';

interface FilterByPriceProps {
    onPriceChange: (priceRange: [number, number]) => void;
    currentRange?: [number, number]; // Добавляем текущий диапазон
}

const FilterByPrice = ({ onPriceChange, currentRange }: FilterByPriceProps) => {
    const MAX_PRICE: number = 4000;
    const [priceRange, setPriceRange] = useState<[number, number]>(currentRange || [0, MAX_PRICE]);

    useEffect(() => {
        if (currentRange) {
            setPriceRange(currentRange);
        } else {
            setPriceRange([0, MAX_PRICE]);
        }
    }, [currentRange]);

    const handlePriceChange = (values: [number, number]) => {
        setPriceRange(values);
    };

    const handleApplyFilter = () => {
        onPriceChange(priceRange);
    };

    return (
        <div className={styles['filter-by-price-container']}>
            <RangeRegulator
                title={'Price Range'}
                valueName={'Price'}
                maxValue={MAX_PRICE}
                minValue={0}
                onChange={handlePriceChange}
                currentValues={priceRange}
            />
            <DarkGreenButton onClick={handleApplyFilter}>Filter</DarkGreenButton>
        </div>
    );
};

export default FilterByPrice;