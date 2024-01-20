import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  // 페이지를 표시할 범위 계산
  const pageRange = Array.from({ length: totalPages.pageLimit }, (_, index) => index + 1);

  return (
    <div>
      {pageRange.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{ fontWeight: currentPage === page ? 'bold' : 'normal' }}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;