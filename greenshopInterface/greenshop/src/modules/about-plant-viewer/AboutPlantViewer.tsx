import styles from './styles/style.module.css';
import { DarkGreenButton } from "@ui/dark-green-button";
import { LightGreenButton } from "@ui/light-green-button";
import { SizeIcon, sizeType } from "@ui/size-icon";
import { PlantGallery } from "@components/plant-galery";
import { Counter } from "@ui/counter";
import { useState } from "react";

export interface PlantInfo {
    name: string;
    price: number;
    sale?: number;
    salePrice?: number;
    rate: number;
    shortDescription: string;
    size: sizeType;
    id: number;
    categories: string[];
    images: string[];
}

interface AboutPlantViewerProps {
    plantInfo: PlantInfo;
    onAddToCart?: (productId: number, quantity: number) => void;
}

const AboutPlantViewer = ({ plantInfo }: AboutPlantViewerProps) => {
    const [quantity, setQuantity] = useState(1);
    const actualPrice = plantInfo.salePrice ? plantInfo.salePrice : plantInfo.price;

    const formatPrice = (value: number) => {
        return value.toFixed(2);
    };

    const handleIncrement = () => {
        setQuantity(prev => Math.min(prev + 1, 100));
    };

    const handleDecrement = () => {
        setQuantity(prev => Math.max(prev - 1, 1));
    };

    return (
        <div className={styles['about-plant-viewer-container']}>
            <div className={styles['galery-container']}>
                <PlantGallery imageUrls={plantInfo.images} />
            </div>

            <div className={styles['about-plant-container']}>
                <h2 className={styles['about-plant-container__title']}>{plantInfo.name}</h2>
                <div className={styles['about-plant-container__info-container']}>
                    <div className={styles['info-container__price-container']}>
                        <p className={styles['price-container__price']}>{formatPrice(actualPrice)}</p>
                        {plantInfo.sale && (
                            <p className={styles['price-container__sale-price']}>
                                {formatPrice(plantInfo.price)}
                            </p>
                        )}
                    </div>
                    {/* рейтинг */}
                </div>
                <div className={styles['about-plant-container__description-container']}>
                    <h3 className={styles['description-container_title']}>Short description</h3>
                    <p className={styles['description-container__description']}>
                        {plantInfo.shortDescription}
                    </p>
                </div>
                <div className={styles['about-plant-container__size-container']}>
                    <h3 className={styles['size-container_title']}>Size</h3>
                    <SizeIcon size={plantInfo.size} />
                </div>
                <div className={styles['about-plant-container__buttons-container']}>
                    <Counter
                        value={quantity}
                        onIncrement={handleIncrement}
                        onDecrement={handleDecrement}
                    />

                    <DarkGreenButton>BUY NOW</DarkGreenButton>
                    <LightGreenButton>
                        ADD TO CART
                    </LightGreenButton>
                    <LightGreenButton iconType="heart" />
                </div>
                <div className={styles['about-plant-container__additional-info-container']}>
                    <p className={styles['additional-info-container__id']}>
                        SCU:
                        <span className={styles['additional-info-container__id__value']}>
                            {plantInfo.id.toString().padStart(13, '0')}
                        </span>
                    </p>
                    <p className={styles['additional-info-container__categories']}>
                        Categories:
                        <span className={styles['additional-info-container__categories__value']}>
                            {plantInfo.categories.join(', ')}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPlantViewer;