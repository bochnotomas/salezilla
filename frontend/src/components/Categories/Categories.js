import React from 'react';
import styles from './Categories.module.scss';
import { Link } from 'react-router-dom';

function Categories() {
  return (
    <div className={styles.container_category_section}>
      <h3>Popular categories</h3>
      <div className={styles.categories}>
        <div className={styles.category}>
          <Link to='/browse' state={{ _category: 'technology' }}>
            Technology
          </Link>
        </div>
        <div className={styles.category}>
          <Link to='/browse' state={{ _category: 'luxury' }}>
            Luxury
          </Link>
        </div>
        <div className={styles.category}>
          <Link to='/browse' state={{ _category: 'automotive' }}>
            Automotive
          </Link>
        </div>
        <div className={styles.category}>
          <Link to='/browse' state={{ _category: 'apparel' }}>
            Apparel
          </Link>
        </div>
        <div className={styles.category}>
          <Link to='/browse' state={{ _category: 'goods' }}>
            Packaged goods
          </Link>
        </div>
        <div className={styles.category}>
          <Link to='/browse' state={{ _category: 'gardening' }}>
            Gardening
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Categories;
