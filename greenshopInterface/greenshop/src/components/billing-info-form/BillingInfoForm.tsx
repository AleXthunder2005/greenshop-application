import styles from './styles/style.module.css';
import { TextBox } from "@ui/text-box";
import React from "react";
import { BillingFormData } from "@/types/order.types.ts";

interface BillingInfoFormProps {
    initialData?: Partial<BillingFormData>;
    onChange?: (data: Partial<BillingFormData>) => void;
}

const BillingInfoForm = ({ initialData, onChange }: BillingInfoFormProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
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
                        className={styles['billing-info-form__input']}
                    />
                </div>
                <div className={styles['billing-info-form__column']}>
                    <TextBox
                        name="lastName"
                        label="Last Name"
                        required
                        value={initialData?.lastName || ''}
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
                        value={initialData?.country || ''}
                        onChange={handleChange}
                        className={styles['billing-info-form__input']}
                    />
                </div>
                <div className={styles['billing-info-form__column']}>
                    <TextBox
                        name="city"
                        label="Town / City"
                        required
                        value={initialData?.city || ''}
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
                    value={initialData?.address || ''}
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
                        value={initialData?.email || ''}
                        onChange={handleChange}
                        className={styles['billing-info-form__input']}
                    />
                </div>

                <div className={styles['billing-info-form__field']}>
                    <TextBox
                        name="phone"
                        label="Phone Number"
                        type="tel"
                        value={initialData?.phone || ''}
                        onChange={handleChange}
                        className={styles['billing-info-form__input']}
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