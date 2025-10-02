import * as React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

 const usePagination = ({ totalPages, currentPage, siblingCount = 1 }) => {
    const paginationRange = React.useMemo(() => {
        const totalPageNumbers = siblingCount + 5;

        if (totalPageNumbers >= totalPages) {
            return [...Array(totalPages)].map((_, idx) => idx + 1);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPages;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = [...Array(leftItemCount)].map((_, i) => i + 1);
            return [...leftRange, '...', totalPages];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = [...Array(rightItemCount)].map((_, i) => totalPages - rightItemCount + i + 1);
            return [firstPageIndex, '...', ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = [];
            for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
                middleRange.push(i);
            }
            return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
        }
    }, [totalPages, currentPage, siblingCount]);

    return paginationRange || [];
};


const CustomPagination = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const paginationRange = usePagination({ currentPage, totalPages });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            onPageChange(Math.max(currentPage - 1, 1));
                        }}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>
                {paginationRange.map((pageNumber, index) => {
                    if (pageNumber === '...') {
                        return <PaginationItem key={`ellipsis-${index}`}><PaginationEllipsis /></PaginationItem>;
                    }

                    return (
                        <PaginationItem key={pageNumber}>
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onPageChange(pageNumber);
                                }}
                                isActive={currentPage === pageNumber}
                            >
                                {pageNumber}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            onPageChange(Math.min(currentPage + 1, totalPages));
                        }}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

export default CustomPagination