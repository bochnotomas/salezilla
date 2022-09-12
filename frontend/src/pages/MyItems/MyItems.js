import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItems, reset } from '../../features/items/itemsSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner/Spinner';
import { useNavigate } from 'react-router-dom';

function MyItems() {
  const { user } = useSelector((state) => state.auth);
  const { items, isError, message } = useSelector((state) => state.items);
  const [isLoading, setIsLoading] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/register');
    }

    dispatch(getItems());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const sellAnItem = async (id) => {
    setIsLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const data = {
        id: id,
      };
      await axios.put('api/items/sell', data, config);
    } catch (error) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  const handleClick = (id) => {
    sellAnItem(id);
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <>
      {items.map((item) => (
        <div key={item._id}>
          <ul>
            <li>{item.itemname}</li>
            <li>{item.description}</li>
            {item.isSold ? (
              <li style={{ color: 'red' }}>THIS ITEM IS SOLD</li>
            ) : (
              <button onClick={() => handleClick(item._id)}>
                Flag as sold
              </button>
            )}
            <img
              src={`./images/${item.photo}`}
              alt=''
              style={{ width: '200px' }}
            />
            <li>{item.createdAt}</li>
          </ul>
        </div>
      ))}
    </>
  );
}

export default MyItems;
