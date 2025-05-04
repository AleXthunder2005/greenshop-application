import { Slider } from '@/modules/slider/Slider';
import styles from './styles/style.module.css'
import { Header } from "@/modules/header";


export function Home() {
  return (
       <div className={styles.wrapper}>
          <Header />
          <Slider/>
       </div>
  );
}
