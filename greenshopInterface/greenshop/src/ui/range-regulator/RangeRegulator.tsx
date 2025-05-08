import { useState} from 'react';
import styles from './styles/style.module.css';

interface RangeRegulatorProps {
    title: string;
    valueName: string;
    minValue?: number;
    maxValue?: number;
    width?: number;
}

const RangeRegulator = ({ title, valueName, minValue = 0, maxValue = 1000, width = 300 }: RangeRegulatorProps) => {
    const [min, setMin] = useState(minValue);
    const [max, setMax] = useState(maxValue);

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(e.target.value), max - 1);
        setMin(value);
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(e.target.value), min + 1);
        setMax(value);
    };

    // Расчет позиции progress-полосы
    const getProgressStyle = () => {
        const minPercent = (min / maxValue) * 100;
        const maxPercent = (max / maxValue) * 100;
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
                    min="0"
                    max={maxValue}
                    value={min}
                    onChange={handleMinChange}
                    className={styles['slider__thumb']}
                />
                <input
                    type="range"
                    min="0"
                    max={maxValue}
                    value={max}
                    onChange={handleMaxChange}
                    className={styles['slider__thumb']}
                />
            </div>
            <div className={styles['range-container__values-container']}>
               <span className={styles['range-container__value-name']}>{valueName}: </span> ${min} - ${max}
            </div>
        </div>
    );
};

export default RangeRegulator;