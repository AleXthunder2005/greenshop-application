import styles from './styles/style.module.css';
import {TextBox} from "@ui/text-box";
import {CartViewer} from "@components/cart-viewer";
import {CartTotals} from "@components/cart-totals";
import {DarkGreenButton} from "@ui/dark-green-button";
import {OrderedPlantData} from "@/types/plants.types.ts";
import {BillingFormData} from "@/types/order.types.ts";
import {collectBillingData} from "@modules/checkout-module/helpers/form.helpers.ts";
import {useRef} from "react";
import React from "react";

interface CheckoutModuleProps {
    plants: OrderedPlantData[];
    onSubmit: (formData: BillingFormData) => void;
}

const CheckoutModule = ({plants, onSubmit} : CheckoutModuleProps) => {
    const formRef = useRef<HTMLFormElement>(null);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formRef.current) {
            const data = collectBillingData(formRef.current);
            onSubmit(data);
        }
    };


    return (
        <form ref={formRef} onSubmit={handleFormSubmit} className={styles['billing-form']}>
            <div className={styles['billing-form__billing-info-container']}>
                <h2 className={styles['billing-form__title']}>Billing Address</h2>
                <div className={styles['billing-form__row']}>
                    <div className={styles['billing-form__column']}>
                        <TextBox
                            name="firstName"
                            label="First Name"
                            required
                            className={styles['billing-form__input']}
                        />
                    </div>
                    <div className={styles['billing-form__column']}>
                        <TextBox
                            name="lastName"
                            label="Last Name"
                            required
                            className={styles['billing-form__input']}
                        />
                    </div>
                </div>

                <div className={styles['billing-form__row']}>
                    <div className={styles['billing-form__column']}>
                        <TextBox
                            name="country"
                            label="Country / Region"
                            required
                            placeholder="Select a country / region"
                            className={styles['billing-form__input']}
                        />
                    </div>
                    <div className={styles['billing-form__column']}>
                        <TextBox
                            name="city"
                            label="Town / City"
                            required
                            className={styles['billing-form__input']}
                        />
                    </div>
                </div>

                <div className={styles['billing-form__field']}>
                    <TextBox
                        name="address"
                        label="Street Address"
                        required
                        placeholder="House number and street name"
                        className={styles['billing-form__input']}
                    />
                </div>

                <div className={styles['billing-form__row']}>
                    <div className={styles['billing-form__field']}>
                        <TextBox
                            name="email"
                            label="Email address"
                            required
                            type="email"
                            className={styles['billing-form__input']}
                        />
                    </div>

                    <div className={styles['billing-form__field']}>
                        <TextBox
                            name="phone"
                            label="Phone Number"
                            type="tel"
                            className={styles['billing-form__input']}
                        />
                    </div>
                </div>

                <div className={styles['billing-form__notes']}>
                    <label className={styles['billing-form__notes-label']}>
                        Order notes (optional)
                    </label>
                    <textarea
                        name={"notes"}
                        className={styles['billing-form__notes-textarea']}
                        placeholder="Notes about your order, e.g. special notes for delivery"
                    />
                </div>
            </div>

            <div className={styles['billing-form__orders-info-container']}>
                <h2 className={styles['orders-info-container__title']}>Your Order</h2>

                <div className={styles['orders-info-container__orders']}>
                    <CartViewer plants={plants} isShortMode={true}/>
                    <CartTotals plants={plants} />
                    <div className={styles['orders-info-container__orders__buttons-container']}>
                        <DarkGreenButton className={styles['buttons-container__submit-button']} type={'submit'}>
                            Place Order
                        </DarkGreenButton>
                        <a href='##' className={styles['buttons-container__continue-shopping-button']}>Continue Shopping</a>
                    </div>
                </div>
            </div>

        </form>
    );
};

export default CheckoutModule;