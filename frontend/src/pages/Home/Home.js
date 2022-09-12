import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner/Spinner';
import styles from './Home.module.scss';
import HeroSection from '../../components/HeroSection/HeroSection';
import Categories from '../../components/Categories/Categories';
import Brands from '../../components/Brands/Brands';
import Items from '../../components/Items/Items';
import Newsletter from '../../components/Newsletter/Newsletter';
import Footer from '../../components/Footer/Footer';

const API_URL_ITEMS = '/api/items/';
const API_URL_USERS = '/api/users/';

function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(API_URL_ITEMS);
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

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className={styles.container}>
      <HeroSection />
      <Categories />
      <Brands />
      <Items items={items.slice(0, 12)} isHomePage={true} />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Home;
