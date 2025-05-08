import styles from './styles/style.module.css';
import getVisiblePages from "@components/pagination/helpers/getVisiblePage.ts";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    const visiblePages = getVisiblePages(currentPage, totalPages);

    return (
        <div className={styles['pagination-container']}>
            <button
                className={styles['pagination-container__pagination-button']}
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                &lt;
            </button>

            {visiblePages.map(page => (
                <button
                    key={page}
                    className={`${styles['pagination-container__pagination-button']} ${currentPage === page ? styles['active'] : ''}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            <button
                className={styles['pagination-container__pagination-button']}
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                &gt;
            </button>
        </div>
    );
};

export default Pagination;