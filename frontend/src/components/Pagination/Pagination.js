import React from 'react';

function Pagination({ itemsPerPage, totalItems, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul>
        {pageNumbers.map((number) => (
          <li key={number}>
            <p
              onClick={() => paginate(number)}
              href='!#'
              style={{ cursor: 'pointer' }}
            >
              {number}
            </p>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
