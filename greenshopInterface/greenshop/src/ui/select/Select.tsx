import styles from './styles/styles.module.css';
import React from "react";

interface SelectProps {
    options: string[];
    name: string;
    value?: string;
    defaultValue?: string;
    onChange?: (selectedValue: string) => void;
    className?: string;
    disabled?: boolean;
    placeholder?: string;
    label?: string;
}

const Select = ({
                    options,
                    value,
                    defaultValue,
                    onChange,
                    className = '',
                    disabled = false,
                    placeholder,
                    label,
                    name,
                }: SelectProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <div className={styles['select-container']}>
            <label htmlFor={name} className={styles['select-container__label']}>{label}</label>
            <select
                value={value}
                defaultValue={defaultValue}
                onChange={handleChange}
                className={`${styles['select']} ${className}`}
                disabled={disabled}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((option: string) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};
export default Select;