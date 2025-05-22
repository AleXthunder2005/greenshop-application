import styles from './styles/style.module.css';
import slideImage from './assets/slide-image.png'
import slideMiniImage from './assets/slide-mini-image.png'
import { DarkGreenLink } from '@/ui/dark-green-link';

export function MainSlide() {
  return (
    <div className={styles['slide-container']}>
      <div className={styles['slide-container__text-content']}>
        <p className={styles['slide-container__text-content__welcome-text']}>Welcome to Greenshop</p>
        <p className={styles['slide-container__text-content__main-text']}>Let’s Make a Better <span className={styles['text-content__main-text__green-text']}>Planet</span></p>
        <p className={styles['slide-container__text-content__description-text']}>We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!</p>
      
        <DarkGreenLink hrefValue='/cart' linkText='Shop now'></DarkGreenLink>
      </div>
      <div className={styles['slide-container__image-container']}>
        <img className={styles['image-container__image']} src={slideImage} alt='image-container__image'></img>
        <img className={styles['image-container__mini-image']} src={slideMiniImage} alt='image-container__mini-image'></img>
      </div>
    </div>
  );
};