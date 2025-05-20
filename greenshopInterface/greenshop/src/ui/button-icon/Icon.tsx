import styles from './styles/style.module.css'

import cartIcon from "./assets/cart-icon.svg";
import doorIcon from "./assets/door-icon.svg";
import loupeIcon from "./assets/loupe-icon.svg";
import cartGreenIcon from "./assets/cartGreen-icon.svg"
import heartIcon from "./assets/heart-icon.svg"
import locationIcon from "./assets/location-icon.svg"
import messageIcon from "./assets/message-icon.svg"
import callingIcon from "./assets/calling-icon.svg"
import deleteIcon from "./assets/delete-icon.svg"
import userIcon from "./assets/user-icon.svg"

export type IconType =
    'cart' |
    'door' |
    'loupe'|
    'cartGreen'|
    'heart'|
    'location'|
    'message'|
    'calling'|
    'delete'|
    'user';

export type IconPosition =
    'left' |
    'right';

interface  ButtonIconProps {
    iconType: IconType;
}

const Icon = ({iconType} : ButtonIconProps) => {
    // Создаем объект для сопоставления имен иконок с импортированными файлами
    const icons = {
        cart: cartIcon,
        door: doorIcon,
        loupe: loupeIcon,
        cartGreen: cartGreenIcon,
        heart: heartIcon,
        location: locationIcon,
        message: messageIcon,
        calling: callingIcon,
        delete: deleteIcon,
        user: userIcon,
    };
    const iconSrc = icons[iconType];

    return (
        <img className={styles['icon-image']}
            src={iconSrc}
            alt={`${iconType}-icon`}
        />
    );
};

export default Icon;