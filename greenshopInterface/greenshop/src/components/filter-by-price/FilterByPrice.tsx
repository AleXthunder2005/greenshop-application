import {DarkGreenButton} from "@ui/dark-green-button";
import {RangeRegulator} from "@ui/range-regulator";

import styles from './styles/style.module.css'

const FilterByPrice = () => {
    return (
        <div className={styles['filter-by-price-container']}>
            <RangeRegulator title={'Price Range'} valueName={'Price'} maxValue={1230} minValue={39}/>
            <DarkGreenButton>Filter</DarkGreenButton>
        </div>
    );
};

export default FilterByPrice;