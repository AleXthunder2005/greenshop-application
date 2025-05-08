import styles from './styles/style.module.css'
import {Logo} from "@ui/logo";
import {Icon} from "@ui/button-icon";

const Footer = () => {
    return (
        <div className={styles['footer-container']}>
            <Logo/>
            <div className={styles['footer-container__block']}>
                <Icon iconType={'location'}/>
                <p className={styles['block__text-content']}>70 West Buckingham Ave. Farmingdale, NY 11735</p>
            </div>
            <div className={styles['footer-container__block']}>
                <Icon iconType={'message'}/>
                <p className={styles['block__text-content']}>contact@greenshop.com</p>
            </div>
            <div className={styles['footer-container__block']}>
                <Icon iconType={'calling'}/>
                <p className={styles['block__text-content']}>+88 01911 717 490</p>
            </div>

        </div>
    );
};

export default Footer;