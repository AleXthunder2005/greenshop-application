import styles from './styles/style.module.css'
import notFoundImage from './assets/not-found-img.png'

const NotFoundImg = () => {
    return (
        <img className={styles['not-found-img']}
            src={notFoundImage}
            alt="not-found-img"
        />
    );
};

export default NotFoundImg;