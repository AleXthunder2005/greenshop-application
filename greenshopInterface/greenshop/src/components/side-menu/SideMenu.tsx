import styles from './styles/style.module.css';
import React, { ReactNode } from 'react';
import {TabTypes} from "@/types/profile.types.ts";

interface MenuItem {
    icon: ReactNode;
    title: string;
    tabKey: TabTypes;
}

interface SideMenuProps {
    menuItems: MenuItem[];
    activeItem: string;
    onTabChange: (activeTab: TabTypes) => void;
}

const SideMenu = ({ menuItems, activeItem, onTabChange }: SideMenuProps) => {
    const handleClick = (tabKey: TabTypes, e: React.MouseEvent) => {
        e.preventDefault();
        onTabChange(tabKey);
    };

    return (
        <div className={styles['side-menu']}>
            {menuItems.map(item => (
                <div
                    key={item.tabKey}
                    className={`${styles['side-menu__item']} ${
                        item.tabKey === activeItem ? styles['side-menu__item_active'] : ''
                    }`}
                    onClick={(e) => handleClick(item.tabKey, e)}
                >
                    {item.icon}
                    <a
                        href="#"
                        className={styles['side-menu__item-title']}
                    >
                        {item.title}
                    </a>
                </div>
            ))}
        </div>
    );
};

export default SideMenu;