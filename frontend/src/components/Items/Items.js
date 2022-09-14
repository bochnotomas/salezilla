import React from 'react';
import styles from './Items.module.scss';
import { Link } from 'react-router-dom';

function Items({ items, isHomePage, isMyItems, handleClick }) {
  if (items.length === 0)
    return (
      <div className={styles.container_dashboard_section}>
        <h3>Dashboard</h3>
        <div className={styles.items}>
          <p>Unfortunately, there are no items.</p>
        </div>
      </div>
    );

  return (
    <div className={styles.container_dashboard_section}>
      {isMyItems ? <h3>Your items</h3> : <h3>Dashboard</h3>}
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
              <div className={styles.item_footer}>
                {isMyItems ? (
                  <>
                    {item.isSold ? (
                      <p>Item sold.</p>
                    ) : (
                      <button
                        className={styles.sell_button}
                        onClick={() => handleClick(item._id)}
                      >
                        Sell
                      </button>
                    )}
                  </>
                ) : (
                  <p>@{item.username}</p>
                )}
              </div>
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
