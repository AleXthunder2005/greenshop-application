import styles from './styles/style.module.css'
import searchingIcon from './assets/searching-icon.svg';

const Searcher = () => {
    return (
        <img src={searchingIcon} alt="searching-icon" className={styles['search-engine__searching-icon']}/>
    );
}

export default Searcher;