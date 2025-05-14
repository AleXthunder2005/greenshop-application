import styles from './styles/style.module.css';
import {TextBox} from "@ui/text-box";

const Checkout = () => {
    return (
        <form className={styles['billing-form']}>
            <h2 className={styles['billing-form__title']}>Billing Address</h2>

            <div className={styles['billing-form__row']}>
                <div className={styles['billing-form__column']}>
                    <TextBox
                        label="First Name"
                        required
                        className={styles['billing-form__input']}
                    />
                </div>
                <div className={styles['billing-form__column']}>
                    <TextBox
                        label="Last Name"
                        required
                        className={styles['billing-form__input']}
                    />
                </div>
            </div>

            <div className={styles['billing-form__row']}>
                <div className={styles['billing-form__column']}>
                    <TextBox
                        label="Country / Region"
                        required
                        placeholder="Select a country / region"
                        className={styles['billing-form__input']}
                    />
                </div>
                <div className={styles['billing-form__column']}>
                    <TextBox
                        label="Town / City"
                        required
                        className={styles['billing-form__input']}
                    />
                </div>
            </div>

            <div className={styles['billing-form__field']}>
                <TextBox
                    label="Street Address"
                    required
                    placeholder="House number and street name"
                    className={styles['billing-form__input']}
                />
            </div>

            <div className={styles['billing-form__row']}>
                <div className={styles['billing-form__field']}>
                    <TextBox
                        label="Email address"
                        required
                        type="email"
                        className={styles['billing-form__input']}
                    />
                </div>

                <div className={styles['billing-form__field']}>
                    <TextBox
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
                    className={styles['billing-form__notes-textarea']}
                    placeholder="Notes about your order, e.g. special notes for delivery"
                />
            </div>
        </form>
    );
};

export default Checkout;