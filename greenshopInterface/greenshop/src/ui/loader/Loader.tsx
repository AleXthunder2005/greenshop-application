import styles from './styles/styles.module.css';

const Loader = () => {
    return (
        <div className={styles['loader-container']}>
            <div className={styles['spinner']}>
                <div className={styles['spinner-inner']}>
                    <div className={styles['spinner-line']}></div>
                    <div className={styles['spinner-line']}></div>
                    <div className={styles['spinner-line']}></div>
                </div>
            </div>
        </div>
    );
};

export default Loader;