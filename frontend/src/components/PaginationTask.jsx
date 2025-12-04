import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"
import React from "react"

const PaginationTask = ({ page, totalPages, handlNextPage, handlePreviousPage, handlePageChange }) => {

  const generatePageItems = () => {
    const pages = [];
    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    }else {
      if (page <= 2) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (page >= totalPages - 1) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
      }
    }
    return pages;
  }
  const pageItems = generatePageItems();
  return (
    <Pagination className="flex justify-start">
      <PaginationContent>
        {/* handlePreviousPage */}
        <PaginationItem>
          <PaginationPrevious
            onClick={page === 1 ? undefined : handlePreviousPage}
            className={cn('cursor-pointer',
            page === 1 && 'pointer-events-none opacity-60'
            )}
           />
        </PaginationItem>
        {pageItems.map((item, index) =>
        (
          <PaginationItem key={index}>
            {item === '...' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                onClick={() => handlePageChange(item)}
                className={cn('cursor-pointer',
                  page === item && 'bg-primary text-primary-foreground hover:bg-primary'
                )}
                isActive={item === page}
              >
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        {/* ... */}
        {/* handlNextPage */}
        <PaginationItem>
          <PaginationNext
            onClick={page === totalPages ? undefined : handlNextPage}
            className={cn('cursor-pointer',
            page === totalPages && 'pointer-events-none opacity-60'
            )}
           />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationTask