import cartIcon from "./assets/cart-icon.svg";
import doorIcon from "./assets/door-icon.svg";
import loupeIcon from "./assets/loupe-icon.svg";

export type IconType =
    'cart' |
    'door' |
    'loupe';

export type IconPosition =
    'left' |
    'right';

interface  ButtonIconProps {
    iconType: IconType;
}

const ButtonIcon = ({iconType} : ButtonIconProps) => {
    // Создаем объект для сопоставления имен иконок с импортированными файлами
    const icons = {
        cart: cartIcon,
        door: doorIcon,
        loupe: loupeIcon
    };
    const iconSrc = icons[iconType];

    return (
        <img
            src={iconSrc}
            alt={`${iconType}-icon`}
        />
    );
};

export default ButtonIcon;