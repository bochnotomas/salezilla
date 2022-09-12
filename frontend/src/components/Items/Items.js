import React from 'react';
import styles from './Items.module.scss';
import { Link } from 'react-router-dom';

function Items({ items, isHomePage }) {
  return (
    <div className={styles.container_dashboard_section}>
      <h3>Dashboard</h3>
      <div className={styles.items}>
        {items &&
          items.map((item) => (
            <div className={styles.item} key={item._id}>
              <div className={styles.item_link}>
                <img
                  src={`./images/${item.photo}`}
                  alt={item.itemname}
                  className={styles.item_image}
                />
                <Link to={`/item/${item._id}`}>i</Link>
              </div>
              <p>@{item.username}</p>
            </div>
          ))}
      </div>
      {isHomePage ? (
        <Link id={styles.dashboard_see_more} to='/browse'>
          See more
        </Link>
      ) : null}
    </div>
  );
}

export default Items;
