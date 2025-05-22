import { List, ListItem } from '@ui/list';

interface SizeItem {
    size: string;
    count: number;
}

interface SizesList {
    sizes: SizeItem[];
    onSizeChange: (size: string) => void;
    activeSize?: string; // Добавляем пропс для активного размера
}

export function FilterBySize({ sizes, onSizeChange, activeSize }: SizesList) {
    const listItems = sizes.map(s => ({
        label: s.size,
        count: s.count
    }));

    const handleSizeClick = (item: ListItem) => {
        onSizeChange(item.label);
    };

    return (
        <List
            listTitle="Size"
            items={listItems}
            activeItem={activeSize ? { label: activeSize, count: 0 } : undefined}
            onItemClick={handleSizeClick}
        />
    );
}