import styles from './styles/style.module.css';
import {PlantCardData} from "@/types/plants.types.ts";
import {formatPrice, getActualPrice} from "@/helpers/plant.helpers.ts";
import {useNavigate} from "react-router-dom";
import {NotFoundImg} from "@ui/not-found-img";

interface PlantCardProps {
    plant: PlantCardData;
}

const PlantCard = ({ plant }: PlantCardProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/shop/${plant.id}`);
    };


    return (
        <div className={styles['plant-card-container']}
             onClick={handleClick}>
            <div className={styles['plant-card-container__image-container']}>
                {plant.sale && (
                    <div className={styles['image-container__sale-block']}>
                        {plant.sale}% OFF
                    </div>
                )}

                {plant.images.length > 0
                ?
                (
                    <img
                        className={styles['image-container__image']}
                        src={plant.images[0]}
                        alt={plant.name}
                    />
                )
                :
                (
                    <NotFoundImg />
                )}

                {/*<div className={styles['image-container__icons-container']}>*/}
                {/*    <Icon iconType={'cartGreen'}/>*/}
                {/*    <Icon iconType={'heart'}/>*/}
                {/*</div>*/}
            </div>

            <div className={styles['plant-card-container__info-container']}>
                <p className={styles['plant-card-container__name']}>{plant.name}</p>
                <div className={styles['plant-card-container__price-container']}>
                    <p className={styles['price-container__price']}>
                        {formatPrice(getActualPrice(plant.price, plant.sale))}
                    </p>
                    {plant.sale && (
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