import { ReactNode, useEffect } from "react";
import styles from "./styles/styles.module.css";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    width?: string;
    height?: string;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style["overflow"] = "hidden";
        } else {
            document.body.style["overflow"] = "auto";
        }

        return () => {
            document.body.style["overflow"] = "auto";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={styles["modal-overlay"]} onClick={onClose}>
            <div
                className={styles["modal-wrapper"]}
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