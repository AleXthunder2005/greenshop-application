import {ProfileModule} from "@modules/profile-module";
import styles from "@modules/profile-module/styles/styles.module.css";
import {SideMenu} from "@components/side-menu";
import {useState} from "react";
import {TabTypes} from "@/types/profile.types.ts";
import {Icon} from "@ui/button-icon";
import {UserOrdersModule} from "@modules/user-orders-module";

const sideMenuItems = [
    {
        icon: <Icon iconType="user" />,
        title: "Account Details",
        tabKey: "AccountDetails" as const
    },
    {
        icon: <Icon iconType="cart" />,
        title: "Orders",
        tabKey: "Orders" as const
    },
    // {
    //     icon: <Icon iconType="heart" />,
    //     title: "Wishlist",
    //     tabKey: "Wishlist" as const
    // }
];


const Profile = () => {
    const [activeTab, setActiveTab] = useState<TabTypes>("AccountDetails");

    return (
        <div className={styles['profile-module']}>
            <SideMenu
                menuItems={sideMenuItems}
                activeItem={activeTab}
                onTabChange={setActiveTab}
            />

            {activeTab === "AccountDetails" && (<ProfileModule />)}
            {activeTab === "Orders" && (<UserOrdersModule />)}
            {/*{activeTab === 'Wishlist' && (<WishlistModule />)}*/}
        </div>
    );
};

export default Profile;