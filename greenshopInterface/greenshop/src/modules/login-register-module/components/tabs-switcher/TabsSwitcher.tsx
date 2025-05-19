import styles from '../styles/styles.module.css';

interface TabsSwitcherProps {
    activeTab: 'login' | 'register';
    onChange: (tab: 'login' | 'register') => void;
}

const TabsSwitcher = ({ activeTab, onChange }: TabsSwitcherProps) => {
    return (
        <div className={styles['tabs-container']}>
            <button
                className={`${styles['tab']} ${activeTab === 'login' ? styles['active'] : ''}`}
                onClick={() => onChange('login')}
            >
                Login
            </button>
            <button
                className={`${styles['tab']} ${activeTab === 'register' ? styles['active'] : ''}`}
                onClick={() => onChange('register')}
            >
                Register
            </button>
        </div>
    );
};

export default TabsSwitcher;