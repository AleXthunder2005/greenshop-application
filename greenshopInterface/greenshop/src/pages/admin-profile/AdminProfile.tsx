import styles from './styles/styles.module.css'
import {SideMenu} from "@components/side-menu";
import {Icon} from "@ui/button-icon";
import {useState} from "react";
import {TabTypes} from "@/types/profile.types.ts";
import {PlantsAdministrator} from "@modules/plants-administraror";
import {OrderAdministrator} from "@modules/order-administrator";

const sideMenuItems = [
    {
        icon: <Icon iconType="user" />,
        title: "Products Administrate",
        tabKey: "Products Administrate" as const
    },
    {
        icon: <Icon iconType="cart" />,
        title: "Orders",
        tabKey: "Orders" as const
    }
];


const AdminProfile = () => {
    const [activeTab, setActiveTab] = useState<TabTypes>("Products Administrate");

    return (
        <div className={styles['admin-profile']}>
            <SideMenu
                menuItems={sideMenuItems}
                activeItem={activeTab}
                onTabChange={setActiveTab}
            />

            {activeTab === "Products Administrate" && (<PlantsAdministrator />)}
            {activeTab === "Orders" && (<OrderAdministrator />)}
        </div>
    );
};

export default AdminProfile;