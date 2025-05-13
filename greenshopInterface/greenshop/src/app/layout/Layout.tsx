import styles from './styles/style.module.css'
import { Header } from "@modules/header";
import { Footer } from "@modules/footer";

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={styles['wrapper']}>
            <Header />
            <main className={styles.main}>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;