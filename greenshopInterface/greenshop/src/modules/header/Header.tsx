import styles from './styles/style.module.css';
import { Logo } from "@ui/logo";
import { NavMenu } from "@ui/nav-menu";
import { CartIcon } from "@ui/cart-icon";
import { LoginRegisterModule } from "@modules/login-register-module";
import {useEffect, useState} from "react";
import { useLocation } from 'react-router-dom';

export function Header() {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<string>(() => {
        // Инициализация activeTab при монтировании компонента
        const path = location.pathname;
        if (path === "/" || path === "/home") {
            return 'Home';
        } else if (path === "/cart") {
            return 'Cart';
        } else if (path === "/blogs") {
            return 'Blogs';
        }
        return 'Home'; //  По умолчанию
    });

    useEffect(() => {
        // Обновление activeTab при изменении location
        const path = location.pathname;
        let newTab = 'Home';

        if (path === "/" || path === "/home") {
            newTab = 'Home';
        } else if (path === "/cart") {
            newTab = 'Cart';
        } else if (path === "/blogs") {
            newTab = 'Blogs';
        } else if (path === "/checkout") {
            newTab = 'Cart';
        }
        setActiveTab(newTab);
    }, [location.pathname]); // Зависимость от location.pathname

    return (
        <div className={styles['header__wrapper']}>
            <Logo />
            <NavMenu activeItem={activeTab} onChangeActiveTab={setActiveTab} />
            <div className={styles['application-management-panel']}>
                {/*<Searcher />*/}
                <a href={'/cart'}><CartIcon /></a>
                <LoginRegisterModule />
            </div>
        </div>
    );
}
