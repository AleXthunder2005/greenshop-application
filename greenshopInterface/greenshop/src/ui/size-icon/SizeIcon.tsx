import styles from './styles/style.module.css'

export type sizeType = 'small' | 'medium' | 'large';
interface SizeIconProps {
    size: sizeType;
}

const SizeIcon = ({size} : SizeIconProps) => {

    let sizeString: string;

    switch (size) {
        case 'small': sizeString = 'S'; break;
        case 'medium': sizeString = 'M'; break;
        case 'large': sizeString = 'L'; break;
        default : sizeString = '?';
    }

    return (
        <div className={styles['size-icon']}>
            {sizeString}
        </div>
    );
};

export default SizeIcon;