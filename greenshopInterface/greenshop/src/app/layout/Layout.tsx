import styles from './styles/style.module.css';
import { Header } from "@modules/header";
import { Footer } from "@modules/footer";
import React, { useState, useEffect, useCallback } from "react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
    const [displayChildren, setDisplayChildren] = useState(children);
    const [transitionStage, setTransitionStage] = useState("fade-in");

    const onAnimationEnd = useCallback(() => {
        if (transitionStage === "fade-out") {
            setDisplayChildren(children);
            setTransitionStage("fade-in");
        }
    }, [children, transitionStage]); // Добавляем children и transitionStage в зависимости

    useEffect(() => {
        if (children !== displayChildren) {
            setTransitionStage("fade-out");
        }
    }, [children, displayChildren]);

    return (
        <div className={styles["wrapper"]}>
            <Header />
            <main
                className={`${styles.main} ${styles[transitionStage]}`}
                onAnimationEnd={onAnimationEnd}
            >
                {displayChildren}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;