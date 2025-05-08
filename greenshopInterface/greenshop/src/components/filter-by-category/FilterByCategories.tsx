import { List , ListItem} from '@ui/list';
import { useState } from 'react';


interface CategoryItem
{
    category: string;
    count: number;
}

interface CategoriesList
{
    categories: CategoryItem[];
}

export function FilterByCategories({ categories }: CategoriesList) {
    const [activeCategory, setActiveCategory] = useState(categories.length ? { label: categories[0].category, count: categories[0].count } : undefined);

  const listItems = categories.map(c => ({
    label: c.category,
    count: c.count
  }));

  const handleCategoryClick = (item: ListItem) => {
    setActiveCategory(item);
    // Здесь можно добавить дополнительную логику фильтрации
  };

  return (
    <List
      listTitle="Categories"
      items={listItems}
      activeItem={activeCategory}
      onItemClick={handleCategoryClick}
    />
  );
}