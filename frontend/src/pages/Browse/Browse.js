import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner/Spinner';
import Items from '../../components/Items/Items';
import Pagination from '../../components/Pagination/Pagination';
import { useLocation } from 'react-router-dom';
import styles from './Browse.module.scss';

const API_URL_ITEMS = '/api/items/';
const API_URL_USERS = '/api/users/';

function Browse() {
  const location = useLocation();
  const _category = location.state ? location.state._category : null;
  const _brand = location.state ? location.state._brand : null;

  const [category, setCategory] = useState(_category ? _category : '');
  const [brand, setBrand] = useState(_brand ? _brand : '');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(16);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (number) => setCurrentPage(number);

  const handleClick = () => {
    setBrand('');
    setCategory('');
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(API_URL_ITEMS, {
          params: { brand, category },
        });
        await Promise.all(
          res.data.map(async (item) => {
            const user = await axios.get(API_URL_USERS + item.user);
            item.username = user.data.username;
          })
        );

        setItems(res.data);
      } catch (error) {
        toast.error(error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [brand, category]);

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.selectors}>
        <div className={styles.selector}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value='technology'>Technology</option>
            <option value='luxury'>Luxury</option>
            <option value='automotive'>Automotive</option>
            <option value='apparel'>Apparel</option>
            <option value='goods'>Packaged goods</option>
            <option value='gardening'>Gardening</option>
          </select>
        </div>

        <div className={styles.selector}>
          <select value={brand} onChange={(e) => setBrand(e.target.value)}>
            <option value='apple'>Apple</option>
            <option value='google'>Google</option>
            <option value='nikon'>Nikon</option>
            <option value='louis_vuitton'>Louis Vuitton</option>
            <option value='gucci'>Gucci</option>
            <option value='dior'>Dior</option>
            <option value='audi'>Audi</option>
            <option value='ford'>Ford</option>
            <option value='toyota'>Toyota</option>
            <option value='nike'>Nike</option>
            <option value='adidas'>Adidas</option>
            <option value='puma'>Puma</option>
            <option value='loreal'>L'Oréal</option>
            <option value='nivea'>Nivea</option>
            <option value='dove'>Dove</option>
          </select>
        </div>
        <button onClick={handleClick}>Clear</button>
      </div>
      <div>
        <Items items={currentItems} />
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={items.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}

export default Browse;
