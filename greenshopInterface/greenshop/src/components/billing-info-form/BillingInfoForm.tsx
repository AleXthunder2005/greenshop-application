import styles from './styles/style.module.css';
import { TextBox } from "@ui/text-box";
import React from "react";
import { BillingFormData } from "@/types/order.types.ts";

interface BillingInfoFormProps {
    initialData?: Partial<BillingFormData>;
    onChange?: (data: Partial<BillingFormData>) => void;
    disabledFields?: (keyof BillingFormData)[];
}

const BillingInfoForm = ({ initialData, onChange, disabledFields = [] }: BillingInfoFormProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange && !disabledFields.includes(e.target.name as keyof BillingFormData)) {
            onChange({
                [e.target.name]: e.target.value
            });
        }
    };

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (onChange) {
            onChange({
                [e.target.name]: e.target.value
            });
        }
    };

    const isFieldDisabled = (fieldName: keyof BillingFormData) => {
        return disabledFields.includes(fieldName);
    };

    return (
        <div className={styles['billing-info-form']}>
            <h2 className={styles['billing-info-form__title']}>Billing Address</h2>
            <div className={styles['billing-info-form__row']}>
                <div className={styles['billing-info-form__column']}>
                    <TextBox
                        name="firstName"
                        label="First Name"
                        required
                        value={initialData?.firstName || ''}
                        onChange={handleChange}
                        disabled={isFieldDisabled('firstName')}
                        className={`${styles['billing-info-form__input']} ${
                            isFieldDisabled('firstName') ? styles['disabled-field'] : ''
                        }`}
                    />
                </div>
                <div className={styles['billing-info-form__column']}>
                    <TextBox
                        name="lastName"
                        label="Last Name"
                        required
                        value={initialData?.lastName || ''}
                        onChange={handleChange}
                        disabled={isFieldDisabled('lastName')}
                        className={`${styles['billing-info-form__input']} ${
                            isFieldDisabled('lastName') ? styles['disabled-field'] : ''
                        }`}
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
                        value={initialData?.country || ''}
                        onChange={handleChange}
                        disabled={isFieldDisabled('country')}
                        className={`${styles['billing-info-form__input']} ${
                            isFieldDisabled('country') ? styles['disabled-field'] : ''
                        }`}
                    />
                </div>
                <div className={styles['billing-info-form__column']}>
                    <TextBox
                        name="city"
                        label="Town / City"
                        required
                        value={initialData?.city || ''}
                        onChange={handleChange}
                        disabled={isFieldDisabled('city')}
                        className={`${styles['billing-info-form__input']} ${
                            isFieldDisabled('city') ? styles['disabled-field'] : ''
                        }`}
                    />
                </div>
            </div>

            <div className={styles['billing-info-form__field']}>
                <TextBox
                    name="address"
                    label="Street Address"
                    required
                    placeholder="House number and street name"
                    value={initialData?.address || ''}
                    onChange={handleChange}
                    disabled={isFieldDisabled('address')}
                    className={`${styles['billing-info-form__input']} ${
                        isFieldDisabled('address') ? styles['disabled-field'] : ''
                    }`}
                />
            </div>

            <div className={styles['billing-info-form__row']}>
                <div className={styles['billing-info-form__field']}>
                    <TextBox
                        name="email"
                        label="Email address"
                        required
                        type="email"
                        value={initialData?.email || ''}
                        onChange={handleChange}
                        disabled={isFieldDisabled('email')}
                        className={`${styles['billing-info-form__input']} ${
                            isFieldDisabled('email') ? styles['disabled-field'] : ''
                        }`}
                    />
                </div>

                <div className={styles['billing-info-form__field']}>
                    <TextBox
                        name="phone"
                        label="Phone Number"
                        type="tel"
                        value={initialData?.phone || ''}
                        onChange={handleChange}
                        disabled={isFieldDisabled('phone')}
                        className={`${styles['billing-info-form__input']} ${
                            isFieldDisabled('phone') ? styles['disabled-field'] : ''
                        }`}
                    />
                </div>
            </div>

            <div className={styles['billing-info-form__notes']}>
                <label className={styles['billing-info-form__notes-label']}>
                    Order notes (optional)
                </label>
                <textarea
                    name="notes"
                    className={styles['billing-info-form__notes-textarea']}
                    placeholder="Notes about your order, e.g. special notes for delivery"
                    value={initialData?.notes || ''}
                    onChange={handleTextareaChange}
                />
            </div>
        </div>
    );
};

export default BillingInfoForm;