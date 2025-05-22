import styles from './styles/style.module.css'
import {PlantSize} from "@/types/plants.types.ts";

interface SizeIconProps {
    size: PlantSize;
}

const SizeIcon = ({size} : SizeIconProps) => {

    let sizeString: string;

    switch (size) {
        case 'Small': sizeString = 'S'; break;
        case 'Medium': sizeString = 'M'; break;
        case 'Large': sizeString = 'L'; break;
        default : sizeString = '?';
    }

    return (
        <div className={styles['size-icon']}>
            {sizeString}
        </div>
    );
};

export default SizeIcon;