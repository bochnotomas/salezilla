import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner/Spinner';
import Items from '../../components/Items/Items';
import Pagination from '../../components/Pagination/Pagination';
import { useLocation } from 'react-router-dom';

const API_URL_ITEMS = '/api/items/';

function Browse() {
  const location = useLocation();
  const _category = location.state ? location.state._category : null;
  const _brand = location.state ? location.state._brand : null;

  const [category, setCategory] = useState(_category ? _category : '');
  const [brand, setBrand] = useState(_brand ? _brand : '');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

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
        const response = await axios.get(API_URL_ITEMS, {
          params: { brand, category },
        });

        setItems(response.data);
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
    <div style={{ marginTop: '100px' }}>
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
              <option value='gardening'>Gardening</option>
            </select>
          </label>
          <label>
            Pick the brand:
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
          </label>

          <button onClick={handleClick}>Clear filters</button>
        </div>
      </header>
      <main>
        <Items items={currentItems} />
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={items.length}
          paginate={paginate}
        />
      </main>
    </div>
  );
}

export default Browse;
