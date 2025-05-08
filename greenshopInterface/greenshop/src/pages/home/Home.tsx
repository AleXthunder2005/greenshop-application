import { Slider } from '@/modules/slider/Slider';
import styles from './styles/style.module.css'
import { Header } from "@/modules/header";
import { FilterByCategories } from '@/components/filter-by-category';
import { Filter } from '@/modules/filter';




export function Home() {
  return (
       <div className={styles.wrapper}>
          <Header />
          <Slider/>
          <Filter/>
       </div>
  );
}
