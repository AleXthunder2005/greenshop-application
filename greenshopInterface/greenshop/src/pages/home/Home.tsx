import { Slider } from '@/modules/slider/Slider';
import {PlantsModule} from "@modules/plants-module";

export function Home() {
  return (
      <>
           <Slider/>
           <PlantsModule/>
      </>
  );
}
