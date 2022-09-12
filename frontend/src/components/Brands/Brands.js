import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Brands.module.scss';

function Brands() {
  return (
    <div className={styles.container_brands_section}>
      <h3>Popular brands</h3>
      <div className={styles.brands}>
        <div className={styles.brand}>
          <Link to='/browse' state={{ _brand: 'apple' }}>
            <img src='./images/logos/apple.png' alt='apple' />
          </Link>
        </div>
        <div className={styles.brand}>
          <Link to='/browse' state={{ _brand: 'audi' }}>
            <img src='./images/logos/audi.png' alt='audi' />
          </Link>
        </div>
        <div className={styles.brand}>
          <Link to='/browse' state={{ _brand: 'dior' }}>
            <img src='./images/logos/dior.png' alt='dior' />
          </Link>
        </div>
        <div className={styles.brand}>
          <Link to='/browse' state={{ _brand: 'google' }}>
            <img src='./images/logos/google.png' alt='google' />
          </Link>
        </div>
        <div className={styles.brand}>
          <Link to='/browse' state={{ _brand: 'gucci' }}>
            <img src='./images/logos/gucci.png' alt='gucci' />
          </Link>
        </div>
        <div className={styles.brand}>
          <Link to='/browse' state={{ _brand: 'louis_vuitton' }}>
            <img src='./images/logos/lv.png' alt='louis_vuitton' />
          </Link>
        </div>
        <div className={styles.brand}>
          <Link to='/browse' state={{ _brand: 'nike' }}>
            <img src='./images/logos/nike.png' alt='nike' />
          </Link>
        </div>
        <div className={styles.brand}>
          <Link to='/browse' state={{ _brand: 'nikon' }}>
            <img src='./images/logos/nikon.png' alt='nikon' />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Brands;
