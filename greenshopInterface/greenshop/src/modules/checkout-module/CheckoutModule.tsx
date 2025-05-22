import styles from './styles/style.module.css';
import { CartViewer } from "@components/cart-viewer";
import { CartTotals } from "@components/cart-totals";
import { DarkGreenButton } from "@ui/dark-green-button";
import { OrderedPlantData } from "@/types/plants.types.ts";
import { BillingFormData } from "@/types/order.types.ts";
import { useRef, useState } from "react";
import {BillingInfoForm} from "@components/billing-info-form";

interface CheckoutModuleProps {
    plants: OrderedPlantData[];
    onSubmit: (formData: BillingFormData) => void;
    initialBillingData?: Partial<BillingFormData>;
}

const CheckoutModule = ({ plants, onSubmit, initialBillingData }: CheckoutModuleProps) => {
    const [billingData, setBillingData] = useState<Partial<BillingFormData>>(initialBillingData || {});
    const formRef = useRef<HTMLFormElement>(null);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formRef.current) {
            const formData = new FormData(formRef.current);
            const data = Object.fromEntries(formData.entries()) as unknown as BillingFormData;
            onSubmit({ ...billingData, ...data });
        }
    };

    const handleBillingDataChange = (data: Partial<BillingFormData>) => {
        setBillingData(prev => ({ ...prev, ...data }));
    };

    return (
        <form ref={formRef} onSubmit={handleFormSubmit} className={styles['checkout-form']}>
            <BillingInfoForm
                initialData={initialBillingData}
                onChange={handleBillingDataChange}
            />

            <div className={styles['checkout-form__orders-info-container']}>
                <h2 className={styles['orders-info-container__title']}>Your Order</h2>
                <div className={styles['orders-info-container__orders']}>
                    <CartViewer plants={plants} isShortMode={true} />
                    <CartTotals plants={plants} />
                    <div className={styles['orders-info-container__orders__buttons-container']}>
                        <DarkGreenButton
                            className={styles['buttons-container__submit-button']}
                            type="submit"
                        >
                            Place Order
                        </DarkGreenButton>
                        <a href="/home" className={styles['buttons-container__continue-shopping-button']}>
                            Continue Shopping
                        </a>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default CheckoutModule;