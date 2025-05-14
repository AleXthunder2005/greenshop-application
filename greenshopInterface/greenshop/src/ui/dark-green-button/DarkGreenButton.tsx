import { ButtonHTMLAttributes } from 'react';
import styles from './styles/style.module.css';
import { Icon, IconPosition, IconType } from "@ui/button-icon";

interface DarkGreenButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    iconType?: IconType;
    iconPosition?: IconPosition;
    className?: string;
}

const DarkGreenButton = ({
                             children,
                             iconType,
                             iconPosition = 'left',
                             className = '',
                             ...props
                         }: DarkGreenButtonProps) => {
    const buttonClassNames = [
        styles['dark-green-button'],
        iconType && styles[`with-icon-${iconPosition}`],
        className
    ].filter(Boolean).join(' ');

    return (
        <button className={buttonClassNames} {...props}>
            {iconType && (
                <span className={styles['button-icon']}>
                    <Icon iconType={iconType} />
                </span>
            )}
            <span className={styles['button-content']}>{children}</span>
        </button>
    );
};

export default DarkGreenButton;