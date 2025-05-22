import { useState, useEffect } from 'react';
import styles from './styles/style.module.css';

interface RangeRegulatorProps {
    title: string;
    valueName: string;
    minValue?: number;
    maxValue?: number;
    width?: number;
    onChange?: (values: [number, number]) => void;
    currentValues?: [number, number]; // Добавляем пропс для внешнего управления значениями
}

const RangeRegulator = ({
                            title,
                            valueName,
                            minValue = 0,
                            maxValue = 1000,
                            width = 300,
                            onChange,
                            currentValues
                        }: RangeRegulatorProps) => {
    // Используем внешние значения, если они переданы, иначе локальное состояние
    const [min, setMin] = useState(currentValues?.[0] ?? minValue);
    const [max, setMax] = useState(currentValues?.[1] ?? maxValue);

    // Синхронизируем внутреннее состояние с внешними значениями
    useEffect(() => {
        if (currentValues) {
            setMin(currentValues[0]);
            setMax(currentValues[1]);
        }
    }, [currentValues]);

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(e.target.value), max - 1);
        setMin(value);
        // Вызываем onChange сразу при изменении, без задержки
        onChange?.([value, max]);
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(e.target.value), min + 1);
        setMax(value);
        // Вызываем onChange сразу при изменении, без задержки
        onChange?.([min, value]);
    };

    // Расчет позиции progress-полосы
    const getProgressStyle = () => {
        const minPercent = ((min - minValue) / (maxValue - minValue)) * 100;
        const maxPercent = ((max - minValue) / (maxValue - minValue)) * 100;
        return {
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`
        };
    };

    return (
        <div className={styles['range-container']} style={{ width: `${width}px` }}>
            <p className={styles['range-container__title']}>{title}</p>
            <div className={styles['range-container__slider']}>
                <div className={styles['slider__track']}></div>
                <div className={styles['slider__progress-track']} style={getProgressStyle()}></div>
                <input
                    type="range"
                    min={minValue}
                    max={maxValue}
                    value={min}
                    onChange={handleMinChange}
                    className={styles['slider__thumb']}
                />
                <input
                    type="range"
                    min={minValue}
                    max={maxValue}
                    value={max}
                    onChange={handleMaxChange}
                    className={styles['slider__thumb']}
                />
            </div>
            <div className={styles['range-container__values-container']}>
                <span className={styles['range-container__value-name']}>{valueName}: </span>
                ${min} - ${max}
            </div>
        </div>
    );
};

export default RangeRegulator;