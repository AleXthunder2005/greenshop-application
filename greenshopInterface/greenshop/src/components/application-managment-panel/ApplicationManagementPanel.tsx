import styles from './styles/style.module.css'
import { SearchEngine } from '@ui/search-engine'
import { CartIcon } from '@ui/cart-icon';
import { LogoutButton } from '@ui/logout-button';

export function ApplicationManagementPanel() {
    return(
        <div className={styles['application-management-panel']}>
            <SearchEngine />
            <CartIcon />
            <LogoutButton />
        </div>
    );
}