import { ButtonHTMLAttributes } from 'react';
import styles from './styles/style.module.css';
import { Icon, IconPosition, IconType } from "@ui/button-icon";

interface LightGreenButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    iconType?: IconType;
    iconPosition?: IconPosition;
}

const LightGreenButton = ({ children, iconType, iconPosition = 'left', ...props }: LightGreenButtonProps) => {
    const buttonClassNames = [
        styles['light-green-button'],
        iconType && styles[`with-icon-${iconPosition}`]
    ].filter(Boolean).join(' ');

    return (
        <button className={buttonClassNames} {...props}>
            {iconType && <Icon iconType={iconType} />}
            {children}
        </button>
    );
};

export default LightGreenButton;