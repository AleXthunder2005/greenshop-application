import styles from './styles/style.module.css';
import { CartViewer } from "@components/cart-viewer";
import { CartTotals } from "@components/cart-totals";
import { DarkGreenButton } from "@ui/dark-green-button";
import { OrderedPlantData } from "@/types/plants.types.ts";
import { BillingFormData } from "@/types/order.types.ts";
import { useRef, useState, useEffect } from "react";
import { BillingInfoForm } from "@components/billing-info-form";
import { useAuth } from "@/contexts/auth-context/AuthContext.tsx";
import { fetchUserProfile } from "@/services/userService";
import { Loader } from "@ui/loader";

interface CheckoutModuleProps {
    plants: OrderedPlantData[];
    onSubmit: (formData: BillingFormData) => void;
}

const CheckoutModule = ({ plants, onSubmit }: CheckoutModuleProps) => {
    const { userId } = useAuth();
    const [billingData, setBillingData] = useState<BillingFormData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const loadUserProfile = async () => {
            if (!userId) return;

            try {
                const profileData = await fetchUserProfile(userId);
                setBillingData(profileData);
            } catch (error) {
                console.error('Failed to load user profile:', error);
                setError('Failed to load profile data');
            } finally {
                setIsLoading(false);
            }
        };

        loadUserProfile();
    }, [userId]);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!billingData) {
            setError('Profile data not loaded');
            return;
        }

        // Проверяем заполнение обязательных полей
        if (!billingData.firstName || !billingData.lastName || !billingData.country ||
            !billingData.city || !billingData.address || !billingData.email) {
            setError('Please complete your profile data before checkout');
            return;
        }

        // Добавляем notes из формы, если они есть
        if (formRef.current) {
            const formData = new FormData(formRef.current);
            const notes = formData.get('notes') as string;
            onSubmit({ ...billingData, notes });
        } else {
            onSubmit(billingData);
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    if (!billingData) {
        return (
            <div className={styles['error-container']}>
                Failed to load user data. Please try again later.
            </div>
        );
    }

    return (
        <div className={styles['checkout-form-container']}>
            <form ref={formRef} onSubmit={handleFormSubmit} className={styles['checkout-form']}>
                <BillingInfoForm
                    initialData={{
                        ...billingData,
                        notes: billingData.notes || ''
                    }}
                    disabledFields={['firstName', 'lastName', 'country', 'city', 'address', 'email', 'phone']}
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
                                disabled={!billingData}
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
            {/* Блок для отображения сообщений */}
            {error && (
                <div className={styles['messages-container']}>
                    <div className={styles['error-message']}>
                        {error}
                        {(!billingData.firstName || !billingData.lastName || !billingData.country ||
                            !billingData.city || !billingData.address || !billingData.email)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutModule;