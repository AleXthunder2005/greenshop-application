import styles from './styles/list.module.css'

export interface ListItem {
    label: string;
    count: number;
}

interface ListProps {
    listTitle: string;
    items: ListItem[];
    activeItem?: ListItem;
    onItemClick?: (item: ListItem) => void;
}

export function List({ listTitle, items, activeItem, onItemClick }: ListProps) {
    return (
      <div className={styles['categories-container']}>
        <p className={styles['categories-container__header']}>{listTitle}</p>
        <ul className={styles['categories-container__categories-list']}>
          {items.map((listItem) => (
            <li 
              key={listItem.label}
              className={`
                ${styles['categories-list__list-item']} 
                ${listItem.label === activeItem?.label && styles['categories-list__list-item_active']}
              `}
              onClick={() => onItemClick?.(listItem)}
            >
              <span className={styles['categories-list__list-item__category']}>
                {listItem.label}
              </span>
              <span className={styles['categories-list__list-item__count']}>
                ({listItem.count})
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }