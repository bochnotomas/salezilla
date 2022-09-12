import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner/Spinner';
import { Link } from 'react-router-dom';
import styles from './Home.module.scss';

const API_URL_ITEMS = '/api/items/';
const API_URL_USERS = '/api/users/';

function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');

  const { user } = useSelector((state) => state.auth);

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
      <div className={styles.container_hero_section}>
        <h1>Millions of items for sale</h1>
        <p>
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s.
        </p>
        <div className={styles.search_input_container}>
          <input
            type='text'
            value={search}
            placeholder='Search for your items'
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>Search</button>
        </div>
      </div>

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
        <Link id={styles.dashboard_see_more} to='/browse'>
          See more
        </Link>
      </div>

      <div className={styles.container_newsletter_section}>
        <h1>Sign up for our newsletter</h1>
        <p>
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s.
        </p>
        <div className={styles.search_input_container}>
          <input
            type='text'
            value={search}
            placeholder='Your email address'
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>Sign Up</button>
        </div>
      </div>

      <div className={styles.container_footer}>
        <div className={styles.footer_left}>
          <img
            className={styles.header_content_logo}
            src='./images/logo.svg'
            alt='logo'
          />
          <span>Your number one marketplace</span>
        </div>
        <div className={styles.footer_right}>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/browse'>Browse</Link>
            </li>
            {user ? null : (
              <li>
                <Link to='/register'>Sign Up</Link>
              </li>
            )}

            <li>
              <Link to='/sell'>Sell</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.container_heel}>
        <div className={styles.heel_left}>
          <span>copyright &copy; salezilla 2022</span>
        </div>
        <div className={styles.heel_right}>
          <ul className={styles.socials}>
            <li>
              <img src='./images/socials/facebook.svg' alt='facebook' />
            </li>
            <li>
              <img src='./images/socials/instagram.svg' alt='instagram' />
            </li>
            <li>
              <img src='./images/socials/twitter.svg' alt='twitter' />
            </li>
            <li>
              <img src='./images/socials/paypal.svg' alt='paypal' />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
