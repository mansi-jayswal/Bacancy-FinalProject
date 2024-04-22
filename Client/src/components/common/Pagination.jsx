import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Pagination({ currentPage, totalPages, onPageChange , itemsPerPage }) {
  const renderPages = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          to=""
          onClick={() => onPageChange(i)}
          className={`${
            currentPage === i
              ? 'bg-customRed text-white'
              : 'text-gray-900 hover:bg-gray-50'
          } relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 sm:my-6">
      <div className=" sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div className='mr-4'>
          {/* <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{currentPage===1 ? "1" : (currentPage-1)*(itemsPerPage)+1}</span> to{' '}
            <span className="font-medium">{Math.min((currentPage) * itemsPerPage, totalPages * itemsPerPage)}</span> of{' '}
            <span className="font-medium">{totalPages * (itemsPerPage)}</span> results
          </p> */}
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <FaChevronLeft />
            </button>
            {renderPages()}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages }
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <FaChevronRight />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Pagination;


