import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '../lib/utils';
import { type PostWithUserName } from '../types';

type PagesPaginationProps = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  postsPerPage: number;
  postWithUserName: PostWithUserName[] | undefined;
};

export default function PagesPagination({
  currentPage,
  setCurrentPage,
  postsPerPage,
  postWithUserName,
}: PagesPaginationProps) {
  const handleNextPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (currentPage < totalPageCount) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handlePageSwitch = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPageCount) {
      setCurrentPage(pageNumber);
    }
  };

  const totalPageCount: number = Math.ceil(
    (postWithUserName?.length || 0) / postsPerPage,
  );

  return (
    <Pagination>
      <PaginationContent className="ml-auto">
        <PaginationItem>
          <PaginationPrevious
            className={cn(
              {
                'pointer-events-none opacity-50': currentPage === 1,
              },
              'cursor-pointer',
            )}
            disabled={currentPage === 1}
            onClick={handlePreviousPage}
          />
        </PaginationItem>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink
              className="cursor-pointer"
              onClick={() => handlePageSwitch(1)}
            >
              1
            </PaginationLink>
          </PaginationItem>
        )}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink
            className="cursor-default"
            isActive
          >
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        {currentPage < totalPageCount && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {currentPage < totalPageCount && (
          <PaginationItem>
            <PaginationLink
              className="cursor-pointer"
              onClick={() => handlePageSwitch(totalPageCount)}
            >
              {totalPageCount}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            className={cn(
              {
                'pointer-events-none opacity-50':
                  currentPage === totalPageCount,
              },
              'cursor-pointer',
            )}
            disabled={currentPage === totalPageCount}
            onClick={handleNextPage}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
