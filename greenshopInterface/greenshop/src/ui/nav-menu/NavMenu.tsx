import styles from './styles/style.module.css';
import cn from 'classnames';

interface NavMenuProps {
  activeItem: string; // или более конкретный тип
}

export function NavMenu({ activeItem }: NavMenuProps) {
  const menuItems = ['Home', 'Shop', 'Plant Care', 'Blogs'];

  return (
    <ul className={styles['nav-menu__items']}>
      {menuItems.map((item) => (
        <li
          key={item}
          className={cn(styles['nav-menu__item'], {
            [styles['nav-menu__item_active']]: activeItem === item,
          })}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}