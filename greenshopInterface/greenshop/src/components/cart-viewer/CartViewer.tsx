import styles from './styles/style.module.css';
import { Counter } from "@ui/counter";
import { Icon } from "@ui/button-icon";

export type PlantInCartOptions = {
    name: string;
    price: number;
    sale?: number;
    salePrice?: number;
    id: number;
    image: string;
    quantity: number;
}

interface CartViewerProps {
    plants: PlantInCartOptions[];
    onQuantityChange: (id: number, newQuantity: number) => void;
    onRemove: (id: number) => void;
    isShortMode?: boolean;
}

const CartViewer = ({ plants, onQuantityChange, onRemove, isShortMode = false }: CartViewerProps) => {
    const formatPrice = (price: number) => `$${price.toFixed(2)}`;
    const formatID = (id: number) => id.toString().padStart(13, '0');

    return (
        <div className={styles['cart-viewer-container']}>
            <table className={styles['cart-viewer-container__table']}>
                <thead className={styles['table__head']}>
                <tr className={styles['table__head-row']}>
                    <th colSpan={2} className={styles['table__head-row__cell']}>Products</th>
                    {!isShortMode &&
                        (<th className={styles['table__head-row__cell']}>Price</th>)}
                    <th className={styles['table__head-row__cell']}>
                        {isShortMode ? '' : 'Quantity'}
                    </th>
                    <th className={styles['table__head-row__cell']}>Total</th>
                    {!isShortMode && <th className={styles['table__head-row__cell']}></th>}
                </tr>
                </thead>

                <tbody className={styles['table__body']}>
                {plants.map((plant) => (
                    <tr className={styles['table__product-info-container']} key={plant.id}>
                        <td className={styles['product-info-container__cell']}>
                            <img
                                className={styles['product-info-container__image']}
                                src={plant.image}
                                alt={plant.name}
                            />
                        </td>
                        <td className={styles['product-info-container__cell']}>
                            <div className={styles['product-info-container__description-container']}>
                                <span className={styles['description-container__name']}>{plant.name}</span>
                                <span className={styles['description-container__id']}>
                                    <span className={styles['description-container__id-title']}>SCU:</span>{formatID(plant.id)}
                                </span>
                            </div>
                        </td>
                        {!isShortMode &&
                            (<td className={styles['product-info-container__cell']}>
                            <div className={styles['product-info-container__price-container']}>
                                <span className={styles['price-container__actual-price']}>
                                    {formatPrice(plant.salePrice || plant.price)}
                                </span>
                                {plant.salePrice && (
                                    <span className={styles['price-container__price-without-sale']}>
                                        {formatPrice(plant.price)}
                                    </span>
                                )}
                            </div>
                        </td>)}
                        <td className={styles['product-info-container__cell']}>
                            {isShortMode
                                ?
                                (<span className={styles['short-quantity']}>(x{plant.quantity})</span>)
                                :
                                (<div className={styles['counter-container']}>
                                    <Counter
                                        value={plant.quantity}
                                        onIncrement={() => onQuantityChange(plant.id, plant.quantity + 1)}
                                        onDecrement={() => onQuantityChange(plant.id, plant.quantity - 1)}
                                        min={1}
                                        max={100}
                                        size={10}
                                    />
                                </div>)
                            }
                        </td>
                        <td className={styles['product-info-container__cell']}>
                            <span className={styles['total-price']}>
                                {formatPrice((plant.salePrice || plant.price) * plant.quantity)}
                            </span>
                        </td>
                        {!isShortMode && (
                            <td className={styles['product-info-container__cell']}>
                                <button
                                    onClick={() => onRemove(plant.id)}
                                    className={styles['delete-button']}
                                    aria-label="Remove item"
                                >
                                    <Icon iconType={'delete'}/>
                                </button>
                            </td>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CartViewer;