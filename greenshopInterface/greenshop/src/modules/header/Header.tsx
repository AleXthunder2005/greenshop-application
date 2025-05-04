import styles from './styles/style.module.css'
import { Logo } from "@ui/logo";
import {NavMenu} from "@ui/nav-menu";
import { ApplicationManagementPanel } from '@components/application-managment-panel';

export function Header() {
    return (
        <div className={styles['header__wrapper']}>
            <Logo />
            <NavMenu activeItem="Home"/>
            <ApplicationManagementPanel />
        </div>
    );
}

