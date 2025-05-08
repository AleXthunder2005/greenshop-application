export default function getVisiblePages (currentPage: number, totalPages: number): number[]
{
    const pages: number[] = [];

    if (totalPages <= 5) {
        // Все страницы, если их 5 или меньше
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    } else {
        // Определяем начальную и конечную страницу
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        // Корректируем, если мы в начале или конце
        if (currentPage <= 3) {
            endPage = 5;
        } else if (currentPage >= totalPages - 2) {
            startPage = totalPages - 4;
        }

        // Формируем массив страниц
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
    }

    return pages;
};