import { Slider } from '@/modules/slider/Slider';
import styles from './styles/style.module.css'
import { Header } from "@/modules/header";
import {PlantsModule} from "@modules/plants-module";
import {Footer} from "@modules/footer";




export function Home() {
  return (
       <div className={styles.wrapper}>
           <Header />
           <Slider/>
           <PlantsModule/>
           <Footer/>
       </div>
  );
}
