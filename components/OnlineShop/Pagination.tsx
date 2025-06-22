"use client";

import { ChevronLeft, ChevronRight, Star, Zap } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}: PaginationProps) => {
  // Calculate the range of items being displayed
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show smart pagination
      if (currentPage <= 3) {
        // Show first 5 pages
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        // Show last 5 pages
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show current page and 2 on each side
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 p-4 sm:p-6 rounded-lg border border-yellow-500/30 shadow-2xl">
      {/* Results info - mobile responsive */}
      <div className="flex flex-col items-center gap-3 mb-4">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-yellow-400 font-mono text-center">
          <Zap className="h-4 w-4 text-yellow-500 flex-shrink-0" />
          <span className="break-words">
            Hyperspace Jump {startItem}-{endItem} of {totalItems} rare artifacts
            discovered
          </span>
        </div>
      </div>

      {/* Pagination controls - wrapping layout */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold text-yellow-400 bg-gray-800 border-2 border-yellow-500/50 rounded-lg hover:bg-gray-700 hover:border-yellow-400 hover:text-yellow-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-gray-800 disabled:hover:border-yellow-500/50 disabled:hover:text-yellow-400 transition-all duration-200 shadow-lg"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Jump Back</span>
        </button>

        {/* First page + ellipsis if needed */}
        {pageNumbers[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-bold text-yellow-400 bg-gray-800 border border-yellow-500/50 rounded-lg hover:bg-gray-700 hover:border-yellow-400 hover:text-yellow-300 transition-all duration-200 shadow-md"
            >
              1
            </button>
            {pageNumbers[0] > 2 && (
              <span className="px-1 sm:px-2 text-yellow-500 font-mono text-xs sm:text-sm">
                ⋯
              </span>
            )}
          </>
        )}

        {/* Page number buttons */}
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-2 sm:px-3 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all duration-200 shadow-md ${
              currentPage === page
                ? "bg-yellow-500 text-black border-2 border-yellow-400 shadow-yellow-500/50 shadow-lg"
                : "text-yellow-400 bg-gray-800 border border-yellow-500/50 hover:bg-gray-700 hover:border-yellow-400 hover:text-yellow-300"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Last page + ellipsis if needed */}
        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <span className="px-1 sm:px-2 text-yellow-500 font-mono text-xs sm:text-sm">
                ⋯
              </span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-bold text-yellow-400 bg-gray-800 border border-yellow-500/50 rounded-lg hover:bg-gray-700 hover:border-yellow-400 hover:text-yellow-300 transition-all duration-200 shadow-md"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold text-yellow-400 bg-gray-800 border-2 border-yellow-500/50 rounded-lg hover:bg-gray-700 hover:border-yellow-400 hover:text-yellow-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-gray-800 disabled:hover:border-yellow-500/50 disabled:hover:text-yellow-400 transition-all duration-200 shadow-lg"
        >
          <span className="hidden sm:inline">Jump Forward</span>
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>

      {/* Enhanced Force-themed message */}
      <div className="text-center border-t border-yellow-500/20 pt-4">
        <div className="flex items-center justify-center gap-2">
          <Star className="h-3 w-3 text-yellow-500" />
          <p className="text-xs text-gray-400 font-mono italic">
            "Use the Force, Luke... to navigate through our galactic inventory"
          </p>
          <Star className="h-3 w-3 text-yellow-500" />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
