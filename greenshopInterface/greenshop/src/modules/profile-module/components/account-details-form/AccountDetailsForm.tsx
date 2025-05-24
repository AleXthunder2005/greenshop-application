import styles from './styles/styles.module.css'
import {BillingFormData} from "@/types/order.types.ts";
import {TextBox} from "@ui/text-box";
import {DarkGreenButton} from "@ui/dark-green-button";

interface AccountDetailsFormProps {
    initialData?: Partial<BillingFormData>

}

const AccountDetailsForm = ({initialData} : AccountDetailsFormProps) => {
    return (
        <div className={styles['account-details']}>
            <form className={styles['account-details-form']}>
                <div className={styles['billing-info-form']}>
                    <h2 className={styles['billing-info-form__title']}>Account Details</h2>
                    <div className={styles['billing-info-form__row']}>
                        <div className={styles['billing-info-form__column']}>
                            <TextBox
                                name="firstName"
                                label="First Name"
                                required
                                value={initialData?.firstName || ''}
                                // onChange={handleChange}
                                className={styles['billing-info-form__input']}
                            />
                        </div>
                        <div className={styles['billing-info-form__column']}>
                            <TextBox
                                name="lastName"
                                label="Last Name"
                                required
                                value={initialData?.lastName || ''}
                                // onChange={handleChange}
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
                                // onChange={handleChange}
                                className={styles['billing-info-form__input']}
                            />
                        </div>
                        <div className={styles['billing-info-form__column']}>
                            <TextBox
                                name="city"
                                label="Town / City"
                                required
                                value={initialData?.city || ''}
                                // onChange={handleChange}
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
                            // onChange={handleChange}
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
                                // onChange={handleChange}
                                className={styles['billing-info-form__input']}
                            />
                        </div>

                        <div className={styles['billing-info-form__field']}>
                            <TextBox
                                name="phone"
                                label="Phone Number"
                                type="tel"
                                value={initialData?.phone || ''}
                                // onChange={handleChange}
                                className={styles['billing-info-form__input']}
                            />
                        </div>
                    </div>

                </div>
                <DarkGreenButton className={styles['billing-info-form__button']}>Save Changes</DarkGreenButton>
            </form>

            {/*<form className={styles['password-change-form']}>*/}
            {/*    <div className={styles['billing-info-form']}>*/}
            {/*        <h2 className={styles['billing-info-form__title']}>Password Change</h2>*/}

            {/*        <div className={styles['billing-info-form__field']}>*/}
            {/*            <TextBox*/}
            {/*                name="password"*/}
            {/*                label="Current Password"*/}
            {/*                type="password"*/}
            {/*                // onChange={handleChange}*/}
            {/*                className={styles['billing-info-form__input']}*/}
            {/*            />*/}
            {/*        </div>*/}

            {/*        <div className={styles['billing-info-form__field']}>*/}
            {/*            <TextBox*/}
            {/*                name="newPassword"*/}
            {/*                label="New Password"*/}
            {/*                type="password"*/}
            {/*                // onChange={handleChange}*/}
            {/*                className={styles['billing-info-form__input']}*/}
            {/*            />*/}
            {/*        </div>*/}

            {/*        <div className={styles['billing-info-form__field']}>*/}
            {/*            <TextBox*/}
            {/*                name="confirmPassword"*/}
            {/*                label="Confirm New Password"*/}
            {/*                type="password"*/}
            {/*                // onChange={handleChange}*/}
            {/*                className={styles['billing-info-form__input']}*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*        <DarkGreenButton className={styles['billing-info-form__button']}>Save Password</DarkGreenButton>*/}

            {/*</form>*/}
        </div>

    );
};

export default AccountDetailsForm;