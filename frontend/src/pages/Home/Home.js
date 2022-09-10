import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner/Spinner';
import { Link } from 'react-router-dom';

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
    <>
      <section>
        <h3>Dashboard</h3>
        {items &&
          items.map((item) => (
            <div key={item._id}>
              <ul>
                <li>{item.itemname}</li>
                <li>
                  <img
                    src={`./images/${item.photo}`}
                    alt=''
                    style={{ width: '100px' }}
                  />
                </li>
                <li>{item.createdAt}</li>
                <li>@{item.username}</li>
                <li>
                  <Link to={`/item/${item._id}`}>More info</Link>
                </li>
              </ul>
            </div>
          ))}
      </section>
    </>
  );
}

export default Home;
