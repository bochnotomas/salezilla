import React from 'react';
import styles from './Pagination.module.scss';

function Pagination({ itemsPerPage, totalItems, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.pagination}>
      <ul>
        {pageNumbers.map((number) => (
          <li key={number}>
            <p onClick={() => paginate(number)}>{number}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
