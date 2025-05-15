import {List, ListItem} from '@ui/list'
import { useState } from 'react';

interface SizeItem
{
    size: string;
    count: number;
}

interface SizesList 
{
    sizes: SizeItem[];
}

export function FilterBySize({ sizes }: SizesList) {
    const [activeSize, setActiveSize] = useState(sizes.length ? { label: sizes[0].size, count: sizes[0].count } : undefined);
  
    const listItems = sizes.map(s => ({
      label: s.size,
      count: s.count
    }));
  
    const handleSizeClick = (item: ListItem) => {
        setActiveSize(item);
        // Здесь можно добавить дополнительную логику фильтрации
      };

    return (
      <List
        listTitle="Size"
        items={listItems}
        activeItem={activeSize}
        onItemClick={handleSizeClick}
      />
    );
}
