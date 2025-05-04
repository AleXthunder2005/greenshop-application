import styles from './styles/style.module.css'
import logoutIcon from './assets/logout-icon.svg';

export function LogoutButton() {
    return (
        <div className={styles['logout-button']}>
            <img src={logoutIcon} alt="logout-icon" className={styles['logout-bitton__logout-icon']}/>
            <span className={styles['logout-button__title']}>Login</span>
        </div>
    );
}