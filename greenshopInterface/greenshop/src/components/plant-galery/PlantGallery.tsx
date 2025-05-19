import styles from './styles/style.module.css';
import { useState } from "react";
import {NotFoundImg} from "@ui/not-found-img";

interface PlantGalleryProps {
    images: string[];
    initialActiveIndex?: number;
}

const PlantGallery = ({ images, initialActiveIndex = 0 }: PlantGalleryProps) => {
    const [activeImageIndex, setActiveImageIndex] = useState(initialActiveIndex);

    return (
        <div className={styles['plant-gallery-container']}>
            <div className={styles['plant-gallery-container__all-images-container']}>
                {images.map((url, index) => (
                    <img
                        className={`${styles['all-images-container__image']} ${
                            activeImageIndex === index ? styles['active-image'] : ''
                        }`}
                        src={url}
                        alt={`Plant thumbnail ${index}`}
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                    />
                ))}
            </div>
            <div className={styles['plant-gallery-container__active-image-container']}>
                {
                    images.length
                    ?
                        <img
                            className={styles['active-image-container__image']}
                            src={images[activeImageIndex]}
                            alt={`Plant image ${activeImageIndex}`}
                        />
                    :
                        <NotFoundImg/>
                }
            </div>
        </div>
    );
};

export default PlantGallery;