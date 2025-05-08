import styles from './styles/style.module.css'
import { SearchEngine } from '@ui/search-engine'
import { CartIcon } from '@ui/cart-icon';
import {DarkGreenButton} from "@ui/dark-green-button";

export function ApplicationManagementPanel() {
    return(
        <div className={styles['application-management-panel']}>
            <SearchEngine />
            <CartIcon />
            <DarkGreenButton iconType={'door'}>Login</DarkGreenButton>
        </div>
    );
}