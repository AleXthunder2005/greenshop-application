import styles from './styles/style.module.css';
import { PlantCardData } from "@/types/plants.types.ts";
import { formatPrice, getActualPrice } from "@/helpers/plant.helpers.ts";
import { NotFoundImg } from "@ui/not-found-img";
import { useEffect, useState } from "react";
import { getPlantImages } from "@/services/plantService.ts";

interface PlantCardProps {
    plant: PlantCardData;
    onClick: (id: string) => void;
}

const PlantCard = ({ plant, onClick }: PlantCardProps) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [imageLoadError, setImageLoadError] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const loadPlantImage = async () => {
            try {
                // 1. Получаем список URL изображений
                const images = await getPlantImages(plant.id);

                if (isMounted && images.length > 0) {
                    // 2. Создаем временный объект Image для проверки загрузки
                    const testImage = new Image();
                    testImage.src = images[0];

                    testImage.onload = () => {
                        if (isMounted) {
                            setImageUrl(images[0]);
                            setImageLoadError(false);
                        }
                    };

                    testImage.onerror = () => {
                        if (isMounted) {
                            setImageLoadError(true);
                        }
                    };
                } else if (isMounted) {
                    setImageLoadError(true);
                }
            } catch (error) {
                console.error('Error loading plant images:', error);
                if (isMounted) setImageLoadError(true);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        loadPlantImage();

        return () => {
            isMounted = false;
        };
    }, [plant.id]);

    const handleClick = () => {
        onClick(plant.id);
    };

    if (isLoading) {
        return (
            <div className={styles['plant-card-container']}>
                <div className={styles['plant-card-container__image-container']}>
                    <div className={styles['image-container__skeleton']} />
                </div>
                <div className={styles['plant-card-container__info-container']}>
                    <div className={styles['name-skeleton']} />
                    <div className={styles['price-skeleton']} />
                </div>
            </div>
        );
    }

    return (
        <div className={styles['plant-card-container']} onClick={handleClick}>
            <div className={styles['plant-card-container__image-container']}>
                {!!plant.sale && (
                    <div className={styles['image-container__sale-block']}>
                        {plant.sale}% OFF
                    </div>
                )}

                {imageUrl && !imageLoadError ? (
                    <img
                        className={styles['image-container__image']}
                        src={imageUrl}
                        alt={plant.name}
                        loading="lazy"
                        onError={() => setImageLoadError(true)}
                    />
                ) : (
                    <NotFoundImg />
                )}
            </div>

            <div className={styles['plant-card-container__info-container']}>
                <p className={styles['plant-card-container__name']}>{plant.name}</p>
                <div className={styles['plant-card-container__price-container']}>
                    <p className={styles['price-container__price']}>
                        {formatPrice(getActualPrice(plant.price, plant.sale))}
                    </p>
                    {!!plant.sale && (
                        <p className={styles['price-container__salePrice']}>
                            {formatPrice(plant.price)}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PlantCard;