import styles from './styles/style.module.css';
import { HTMLProps, useState, useEffect } from "react";

interface TextBoxProps extends HTMLProps<HTMLInputElement> {
    label?: string;
    required?: boolean;
    pattern?: string;
    errorMessage?: string;
}

const TextBox = ({
                     label,
                     required,
                     pattern,
                     errorMessage = "Invalid input",
                     type = "text",
                     className = "",
                     ...props
                 }: TextBoxProps) => {
    const [isValid, setIsValid] = useState(true);
    const [isTouched, setIsTouched] = useState(false);

    useEffect(() => {
        if (isTouched && props.value && pattern) {
            const regex = new RegExp(pattern);
            setIsValid(regex.test(props.value as string));
        }
    }, [props.value, pattern, isTouched]);

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsTouched(true);
        if (props.onBlur) props.onBlur(e);
    };

    return (
        <div className={`${styles['text-box']} ${className}`}>
            {label && (
                <label className={styles['text-box__label']}>
                    {label}
                    {required && <span className={styles['text-box__required']}>*</span>}
                </label>
            )}

            <input
                type={type}
                className={`
                  ${styles['text-box__input']} 
                  ${!isValid && isTouched ? styles['text-box__input_invalid'] : ''}
                `}
                onBlur={handleBlur}
                {...props}
            />

            {!isValid && isTouched && (
                <div className={styles['text-box__error-message']}>{errorMessage}</div>
            )}
        </div>
    );
};

export default TextBox;