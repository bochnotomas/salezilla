import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner/Spinner';
import styles from './ItemPage.module.scss';

const API_URL_ITEMS = '/api/items/';

function ItemPage() {
  const { id } = useParams();
  const [user, setUser] = useState('');
  const [item, setItem] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(API_URL_ITEMS + id);
        const { item, user } = response.data;
        setUser(user);
        setItem(item);
      } catch (error) {
        toast.error(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const formatDate = (date) => {
    var myDate = new Date(date);
    const day = myDate.toLocaleDateString('en-US');
    const time = myDate.toLocaleString().split(',')[1].trim().substring(0, 5);
    return `${time} ${day}`;
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <>
      {item && (
        <div className={styles.container}>
          <div className={styles.item_info}>
            <div className={styles.container_left}>
              <img src={`../images/${item.photo}`} alt={`${item.itemname}`} />
            </div>

            <div className={styles.container_right}>
              <div className={styles.name_description}>
                <h3>{item.itemname}</h3>
                <p>{item.description}</p>
              </div>
              <div className={styles.details_wrapper}>
                <div className={styles.time_price}>
                  <div className={styles.time}>
                    <img src='../images/assets/clock.svg' alt='clock' />
                    <p>added at {formatDate(item.createdAt)}</p>
                  </div>
                  <div className={styles.price}>
                    <img src='../images/assets/price.svg' alt='clock' />
                    <p>{item.price}$</p>
                  </div>
                </div>
                <div className={styles.interactions}>
                  {item.isSold ? (
                    <button className={styles.sold}>Item sold</button>
                  ) : (
                    <button className={styles.buy_now}>Buy now</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ItemPage;
