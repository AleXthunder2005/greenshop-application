import { List, ListItem } from '@ui/list';

interface CategoryItem {
    category: string;
    count: number;
}

interface CategoriesList {
    categories: CategoryItem[];
    onCategoryChange: (category: string) => void;
    activeCategory?: string; // Добавляем пропс для активной категории
}

export function FilterByCategories({ categories, onCategoryChange, activeCategory }: CategoriesList) {
    const listItems = categories.map(c => ({
        label: c.category,
        count: c.count
    }));

    const handleCategoryClick = (item: ListItem) => {
        onCategoryChange(item.label);
    };

    return (
        <List
            listTitle="Categories"
            items={listItems}
            activeItem={activeCategory ? { label: activeCategory, count: 0 } : undefined}
            onItemClick={handleCategoryClick}
        />
    );
}