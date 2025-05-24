import styles from './styles/styles.module.css';
import {BillingFormData} from "@/types/order.types.ts";
import {TextBox} from "@ui/text-box";
import {DarkGreenButton} from "@ui/dark-green-button";
import {useEffect, useState} from "react";
import {fetchUserProfile, updateUserProfile} from "@/services/userService";
import {useAuth} from "@/contexts/auth-context/AuthContext.tsx";
import {Loader} from "@ui/loader";

const AccountDetailsForm = () => {
    const {userId} = useAuth();
    const [formData, setFormData] = useState<BillingFormData>({
        firstName: '',
        lastName: '',
        country: '',
        city: '',
        address: '',
        email: '',
        phone: '',
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        const loadUserProfile = async () => {
            if (!userId) return;

            try {
                const profileData = await fetchUserProfile(userId);
                setFormData(profileData);
            } catch (error) {
                console.error('Failed to load user profile:', error);
                setError('Failed to load profile data');
            } finally {
                setIsLoading(false);
            }
        };

        loadUserProfile();
    }, [userId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        // Сбрасываем сообщения при изменении данных
        setError(null);
        setSuccess(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Сбрасываем предыдущие сообщения
        setError(null);
        setSuccess(null);

        // Валидация
        if (!formData.firstName || !formData.lastName || !formData.country ||
            !formData.city || !formData.address || !formData.email) {
            setError('Please fill all required fields');
            return;
        }

        setIsSubmitting(true);

        try {
            if (!userId) throw new Error('User not authenticated');

            await updateUserProfile(userId, formData);
            setSuccess('Profile updated successfully');
        } catch (error) {
            console.error('Failed to update profile:', error);
            setError('Failed to update profile');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <Loader/>;
    }

    return (
        <div className={styles['account-details']}>
            <form className={styles['account-details-form']} onSubmit={handleSubmit}>
                <div className={styles['billing-info-form']}>
                    <h2 className={styles['billing-info-form__title']}>Account Details</h2>
                    <div className={styles['billing-info-form__row']}>
                        <div className={styles['billing-info-form__column']}>
                            <TextBox
                                name="firstName"
                                label="First Name"
                                required
                                value={formData.firstName}
                                onChange={handleChange}
                                className={styles['billing-info-form__input']}
                            />
                        </div>
                        <div className={styles['billing-info-form__column']}>
                            <TextBox
                                name="lastName"
                                label="Last Name"
                                required
                                value={formData.lastName}
                                onChange={handleChange}
                                className={styles['billing-info-form__input']}
                            />
                        </div>
                    </div>

                    <div className={styles['billing-info-form__row']}>
                        <div className={styles['billing-info-form__column']}>
                            <TextBox
                                name="country"
                                label="Country / Region"
                                required
                                placeholder="Select a country / region"
                                value={formData.country}
                                onChange={handleChange}
                                className={styles['billing-info-form__input']}
                            />
                        </div>
                        <div className={styles['billing-info-form__column']}>
                            <TextBox
                                name="city"
                                label="Town / City"
                                required
                                value={formData.city}
                                onChange={handleChange}
                                className={styles['billing-info-form__input']}
                            />
                        </div>
                    </div>

                    <div className={styles['billing-info-form__field']}>
                        <TextBox
                            name="address"
                            label="Street Address"
                            required
                            placeholder="House number and street name"
                            value={formData.address}
                            onChange={handleChange}
                            className={styles['billing-info-form__input']}
                        />
                    </div>

                    <div className={styles['billing-info-form__row']}>
                        <div className={styles['billing-info-form__field']}>
                            <TextBox
                                name="email"
                                label="Email address"
                                required
                                type="email"
                                value={formData.email}
                                disabled
                                className={styles['billing-info-form__input']}
                            />
                        </div>

                        <div className={styles['billing-info-form__field']}>
                            <TextBox
                                name="phone"
                                label="Phone Number"
                                type="tel"
                                value={formData.phone || ''}
                                onChange={handleChange}
                                className={styles['billing-info-form__input']}
                            />
                        </div>
                    </div>
                </div>

                {/* Блок для отображения сообщений */}
                <div className={styles['messages-container']}>
                    {error && <div className={styles['error-message']}>{error}</div>}
                    {success && <div className={styles['success-message']}>{success}</div>}
                </div>

                <DarkGreenButton
                    type="submit"
                    className={styles['billing-info-form__button']}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                </DarkGreenButton>
            </form>
        </div>
    );
};

export default AccountDetailsForm;