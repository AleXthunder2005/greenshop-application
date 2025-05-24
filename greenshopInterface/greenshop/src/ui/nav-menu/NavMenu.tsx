import styles from './styles/style.module.css';
import cn from 'classnames';

interface NavMenuProps {
  activeItem: string;
  onChangeActiveTab: (activeTab: string) => void;
}

export function NavMenu({ activeItem, onChangeActiveTab }: NavMenuProps) {
  const menuItems = ['Home', 'Cart', 'Blogs'];

  return (
    <ul className={styles['nav-menu__items']}>
      {menuItems.map((item) => (
        <li
          key={item}
          className={cn(styles['nav-menu__item'], {
            [styles['nav-menu__item_active']]: activeItem === item,
          })}
        >
          <a
              href={`/${item.toLowerCase()}`}
              className={cn(styles['nav-menu__item'], {
                [styles['nav-menu__item_active']]: activeItem === item,
              })}
              onClick={() => onChangeActiveTab(item)}
          >
            {item}
          </a>
        </li>
      ))}
    </ul>
  );
}