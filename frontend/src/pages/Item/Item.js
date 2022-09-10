import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner/Spinner';

const API_URL_ITEMS = '/api/items/';

function Item() {
  const { id } = useParams();
  const [user, setUser] = useState('');
  const [item, setItem] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <>
      <section>
        <h3>Item info:</h3>
        {item.isSold ? <p>this item is sold</p> : null}
        <img
          src={`../images/${item.photo}`}
          alt='whatever'
          style={{ width: '300px' }}
        />
        <ul>
          <li>{item.itemname}</li>
          <li>{item.description}</li>
          <li>{item.price}</li>
        </ul>

        <h3>Sellers info:</h3>
        <ul>
          <li>{user.phonenumber}</li>
          <li>{user.email}</li>
        </ul>
      </section>
    </>
  );
}

export default Item;
