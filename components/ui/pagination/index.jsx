import React from 'react';
import Image from 'next/image';

const Pagination = ({ currentPage = 1, totalItems = 0, itemsPerPage = 6, onPageChange }) => {

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startItem = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Define dynamic page range
  const pagesAroundCurrent = 2; 
  let startPage = Math.max(2, currentPage - pagesAroundCurrent);
  let endPage = Math.min(totalPages - 1, currentPage + pagesAroundCurrent);

  // Adjust range to ensure a consistent number of visible pages
  const maxVisiblePages = 5;
  if (endPage - startPage + 1 < maxVisiblePages) {
    if (currentPage <= pagesAroundCurrent + 1) {
      endPage = Math.min(maxVisiblePages, totalPages - 1);
    } else if (currentPage >= totalPages - pagesAroundCurrent) {
      startPage = Math.max(2, totalPages - maxVisiblePages + 1);
    }
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const showLeftEllipsis = startPage > 2;
  const showRightEllipsis = endPage < totalPages - 1;

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-between flex-col md:flex-row md:gap-[unset] gap-6 py-4">
      {/* Pagination status */}
      <div className="text-sm basis-1/3 justify-center">
        Showing {startItem} to {endItem} of {totalItems} results
      </div>

      {/* Prev/next button */}
      <div className="flex gap-4 basis-1/3 justify-center">
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          className={`px-[14px] py-[4px] text-sm font-medium rounded-md flex gap-2 items-center transition-all duration-300 ${currentPage === 1
              ? 'text-white bg-gray-400 cursor-not-allowed'
              : 'text-white bg-black hover:bg-[var(--mainColor)]'
            }`}
          disabled={currentPage === 1}
        >
          <Image src="/icons/double-caret-left.svg" height={14} width={14} alt="missing image" />
          <span>Previous</span>
        </button>

        <button
          onClick={() => handlePageClick(currentPage + 1)}
          className={`px-[10px] py-[6px] text-sm font-medium rounded-md flex gap-2 items-center transition-all duration-300 ${currentPage === totalPages
              ? 'text-white bg-gray-400 cursor-not-allowed'
              : 'text-white bg-black hover:bg-[var(--mainColor)]'
            }`}
          disabled={currentPage === totalPages}
        >
          <span>Next</span>
          <Image src="/icons/double-caret-right.svg" height={14} width={14} alt="missing image" />
        </button>
      </div>

      {/* Page number status */}
      <div className="flex gap-2 basis-1/3 justify-center">
        {/* Left arrow */}
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-300 ${currentPage === 1
              ? 'text-white bg-gray-400 cursor-not-allowed'
              : 'text-black bg-gray-200 hover:bg-gray-300'
            }`}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
        >
          &lt;
        </button>

        {/* Page 1 */}
        <button
          onClick={() => handlePageClick(1)}
          className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-300 ${currentPage === 1
              ? 'bg-[var(--mainColor)] text-white'
              : 'bg-black text-white hover:bg-[var(--mainColor)]'
            }`}
          aria-label="Go to page 1"
          aria-current={currentPage === 1 ? 'page' : undefined}
        >
          1
        </button>

        {/* Left ellipsis */}
        {showLeftEllipsis && (
          <span className="text-gray-400 px-2">...</span>
        )}

        {/* Dynamic page numbers */}
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-300 ${page === currentPage
                ? 'bg-[var(--mainColor)] text-white'
                : 'bg-black text-white hover:bg-[var(--mainColor)]'
              }`}
            aria-label={`Go to page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}

        {/* Right ellipsis */}
        {showRightEllipsis && (
          <span className="text-gray-400 px-2">...</span>
        )}

        {/* Last page */}
        {totalPages > 1 && (
          <button
            onClick={() => handlePageClick(totalPages)}
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-300 ${currentPage === totalPages
                ? 'bg-[var(--mainColor)] text-white'
                : 'bg-black text-white hover:bg-[var(--mainColor)]'
              }`}
            aria-label={`Go to page ${totalPages}`}
            aria-current={currentPage === totalPages ? 'page' : undefined}
          >
            {totalPages}
          </button>
        )}

        {/* Right arrow */}
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-300 ${currentPage === totalPages
              ? 'text-white bg-gray-400 cursor-not-allowed'
              : 'bg-black text-white hover:bg-[var(--mainColor)]'
            }`}
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;