import cartIcon from "./assets/cart-icon.svg";
import doorIcon from "./assets/door-icon.svg";
import loupeIcon from "./assets/loupe-icon.svg";
import cartGreenIcon from "./assets/cartGreen-icon.svg"
import heartIcon from "./assets/heart-icon.svg"

export type IconType =
    'cart' |
    'door' |
    'loupe'|
    'cartGreen'|
    'heart';

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
        heart: heartIcon
    };
    const iconSrc = icons[iconType];

    return (
        <img
            src={iconSrc}
            alt={`${iconType}-icon`}
        />
    );
};

export default Icon;