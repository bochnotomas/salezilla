import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

const API_URL_ITEMS = '/api/items/';

function Browse() {
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_URL_ITEMS, {
        params: { brand, category },
      });

      console.log(response.data);
      setItems(response.data);
    } catch (error) {
      toast.error(error);
    }
    setIsLoading(false);
  };

  const handleClick = () => {
    setBrand('');
    setCategory('');
  };

  useEffect(() => {
    fetchData();
  }, [brand, category]);

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <div>
      <header>
        <h3>Dashboard:</h3>
        <div>
          <label>
            Pick the category:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value='technology'>Technology</option>
              <option value='luxury'>Luxury</option>
              <option value='automotive'>Automotive</option>
              <option value='apparel'>Apparel</option>
              <option value='goods'>Packaged goods</option>
            </select>
          </label>
          <label>
            Pick the brand:
            <select value={brand} onChange={(e) => setBrand(e.target.value)}>
              <option value='apple'>Apple</option>
              <option value='google'>Google</option>
              <option value='google'>Nikon</option>
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
          </label>

          <button onClick={handleClick}>Clear filters</button>
        </div>
      </header>
      <main>
        {items
          ? items.map((item) => (
              <ul key={item._id}>
                <li>{item.itemname}</li>
              </ul>
            ))
          : null}
      </main>
    </div>
  );
}

export default Browse;
