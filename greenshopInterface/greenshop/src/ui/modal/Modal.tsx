import { ReactNode, useEffect, useState } from "react";
import styles from "./styles/styles.module.css";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    width?: string;
    height?: string;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = "hidden";
        } else {
            setIsVisible(false);
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    if (!isOpen && !isVisible) return null;

    return (
        <div
            className={`${styles["modal-overlay"]} ${isVisible ? styles["modal-overlay-visible"] : ""}`}
            onClick={onClose}
        >
            <div
                className={`${styles["modal-wrapper"]} ${isVisible ? styles["modal-wrapper-visible"] : ""}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles["modal-content"]}>
                    <button
                        className={styles["modal-close-button"]}
                        onClick={onClose}
                    >
                        &times;
                    </button>
                    {children}
                </div>
                <div className={styles["modal-footer-decoration"]}></div>
            </div>
        </div>
    );
};

export default Modal;