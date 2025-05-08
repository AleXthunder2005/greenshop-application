import { ButtonHTMLAttributes } from 'react';
import styles from './styles/style.module.css';
import { Icon, IconPosition, IconType } from "@ui/button-icon";

interface DarkGreenButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    iconType?: IconType;
    iconPosition?: IconPosition;
}

const DarkGreenButton = ({ children, iconType, iconPosition = 'left', ...props }: DarkGreenButtonProps) => {
    const buttonClassNames = [
        styles['dark-green-button'],
        iconType && styles[`with-icon-${iconPosition}`]
    ].filter(Boolean).join(' ');

    return (
        <button className={buttonClassNames} {...props}>
            {iconType && <Icon iconType={iconType} />}
            {children}
        </button>
    );
};

export default DarkGreenButton;