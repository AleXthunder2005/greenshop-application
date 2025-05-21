import styles from './styles/styles.module.css';
import React from "react";

interface TextAreaProps {
    name: string;
    value?: string;
    defaultValue?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; // Изменено на обработчик события
    className?: string;
    disabled?: boolean;
    placeholder?: string;
    label?: string;
    rows?: number;
    cols?: number;
}

const TextArea = ({
                      name,
                      value,
                      defaultValue,
                      onChange,
                      className = '',
                      disabled = false,
                      placeholder = '',
                      label,
                      rows = 3,
                      cols,
                  }: TextAreaProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (onChange) {
            onChange(e); // Передаем событие целиком
        }
    };

    return (
        <div className={styles['text-box']}>
            {label && (
                <label htmlFor={name} className={styles['text-box__label']}>
                    {label}
                </label>
            )}
            <textarea
                id={name}
                name={name}
                value={value}
                defaultValue={defaultValue}
                onChange={handleChange}
                className={`${styles['text-box__input']} ${className}`}
                disabled={disabled}
                placeholder={placeholder}
                rows={rows}
                cols={cols}
            />
        </div>
    );
};

export default TextArea;