import styles from './styles/style.module.css'
import notFoundImage from './assets/not-found-img.png'

interface NotFoundImgProps {
    className?: string
}

const NotFoundImg = ({className = ''}) : NotFoundImgProps => {
    return (
        <img className={`${styles['not-found-img']} ${className}`}
            src={notFoundImage}
            alt="not-found-img"
        />
    );
};

export default NotFoundImg;