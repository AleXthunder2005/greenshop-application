import styles from './styles/style.module.css'
import { Logo } from "@ui/logo";
import {NavMenu} from "@ui/nav-menu";
import {SearchEngine} from "@ui/search-engine";
import {CartIcon} from "@ui/cart-icon";
import {LoginRegisterModule} from "@modules/login-register-module";

export function Header() {
    return (
        <div className={styles['header__wrapper']}>
            <Logo />
            <NavMenu activeItem="Home"/>
            <div className={styles['application-management-panel']}>
                <SearchEngine />
                <CartIcon />
                <LoginRegisterModule/>
            </div>
        </div>
    );
}

