import styles from './styles/style.module.css';
import { Icon } from "@ui/button-icon";

export type PlantCardProps = {
    name: string;
    iconPath: string;
    price: number;
    sale?: number;
    salePrice?: number;
}

const PlantCard = ({ name, iconPath, price, sale, salePrice }: PlantCardProps) => {
    // Функция для форматирования цены
    const formatPrice = (value: number) => {
        return value.toFixed(2); // Всегда 2 знака после запятой
    };

    return (
        <div className={styles['plant-card-container']}>
            <div className={styles['plant-card-container__image-container']}>
                {sale && (
                    <div className={styles['image-container__sale-block']}>
                        {sale}% OFF
                    </div>
                )}
                <img
                    className={styles['image-container__image']}
                    src={iconPath}
                    alt={name}
                />
                <div className={styles['image-container__icons-container']}>
                    <Icon iconType={'cartGreen'}/>
                    <Icon iconType={'heart'}/>
                </div>
            </div>

            <div className={styles['plant-card-container__info-container']}>
                <p className={styles['plant-card-container__name']}>{name}</p>
                <div className={styles['plant-card-container__price-container']}>
                    <p className={styles['price-container__price']}>
                        ${formatPrice(price)}
                    </p>
                    {salePrice && (
                        <p className={styles['price-container__salePrice']}>
                            ${formatPrice(salePrice)}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PlantCard;