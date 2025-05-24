import styles from './styles/style.module.css';
import { DarkGreenButton } from "@ui/dark-green-button";
import { LightGreenButton } from "@ui/light-green-button";
import { SizeIcon } from "@ui/size-icon";
import { PlantGallery } from "@components/plant-galery";
import { Counter } from "@ui/counter";
import { useState } from "react";
import { PlantData } from '@/types/plants.types.ts';
import { formatPrice, getActualPrice } from "@/helpers/plant.helpers.ts";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/cart-context/CartContext.tsx";
import {useAuth} from "@/contexts/auth-context/AuthContext.tsx";

interface AboutPlantViewerProps {
    plantData: PlantData;
}

const AboutPlantViewer = ({ plantData }: AboutPlantViewerProps) => {
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState<{text: string, isError: boolean} | null>(null);
    const navigate = useNavigate();
    const { dispatch } = useCart();
    const {isAuthenticated} = useAuth();

    const handleIncrement = () => {
        setQuantity(prev => Math.min(prev + 1, 100));
    };

    const handleDecrement = () => {
        setQuantity(prev => Math.max(prev - 1, 1));
    };

    const showAuthMessage = () => {
        setMessage({
            text: 'Please sign in to add items to cart or make purchases',
            isError: true
        });
        setTimeout(() => setMessage(null), 5000); // Автоматическое скрытие через 5 сек
    };

    const handleAddToCartClick = () => {
        if (!isAuthenticated) {
            showAuthMessage();
            return;
        }

        dispatch({
            type: 'ADD_ITEM',
            payload: {
                id: plantData.id,
                name: plantData.name,
                price: plantData.price,
                sale: plantData.sale,
                image: plantData.images ? plantData.images[0] : '',
                quantity: quantity
            }
        });
    };

    const handleBuyClick = () => {
        if (!isAuthenticated) {
            showAuthMessage();
            return;
        }

        handleAddToCartClick();
        navigate("/cart");
    };

    return (
        <div className={styles['about-plant-viewer-container']}>
            {/* Message container */}
            {message && (
                <div className={`${styles['message-container']} ${
                    message.isError ? styles['error'] : styles['success']
                }`}>
                    {message.text}
                </div>
            )}

            <div className={styles['galery-container']}>
                <PlantGallery images={plantData.images} />
            </div>

            <div className={styles['about-plant-container']}>
                <h2 className={styles['about-plant-container__title']}>{plantData.name}</h2>
                <div className={styles['about-plant-container__info-container']}>
                    <div className={styles['info-container__price-container']}>
                        <p className={styles['price-container__price']}>
                            {formatPrice(getActualPrice(plantData.price, plantData.sale))}
                        </p>
                        {plantData.sale && (
                            <p className={styles['price-container__sale-price']}>
                                {formatPrice(plantData.price)}
                            </p>
                        )}
                    </div>
                </div>
                <div className={styles['about-plant-container__description-container']}>
                    <h3 className={styles['description-container_title']}>Short description</h3>
                    <p className={styles['description-container__description']}>
                        {plantData.shortDescription}
                    </p>
                </div>
                <div className={styles['about-plant-container__size-container']}>
                    <h3 className={styles['size-container_title']}>Size</h3>
                    <SizeIcon size={plantData.size} />
                </div>
                <div className={styles['about-plant-container__buttons-container']}>
                    <Counter
                        value={quantity}
                        onIncrement={handleIncrement}
                        onDecrement={handleDecrement}
                    />
                    <DarkGreenButton onClick={handleBuyClick}>BUY NOW</DarkGreenButton>
                    <LightGreenButton onClick={handleAddToCartClick}>
                        ADD TO CART
                    </LightGreenButton>
                </div>
                <div className={styles['about-plant-container__additional-info-container']}>
                    <p className={styles['additional-info-container__id']}>
                        SCU:
                        <span className={styles['additional-info-container__id__value']}>
                            {plantData.id.toString().padStart(13, '0')}
                        </span>
                    </p>
                    <p className={styles['additional-info-container__categories']}>
                        Categories:
                        <span className={styles['additional-info-container__categories__value']}>
                            {plantData.category}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPlantViewer;