import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createItem, getItems, reset } from '../features/items/itemsSlice';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';

function Sell() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { items, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.items
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('itemname', name);
    formData.append('description', description);
    formData.append('photo', photo);

    dispatch(createItem(formData));
    if (isSuccess) {
      toast.success('Item added successfully!');
    }
  };

  useEffect(() => {
    if (user) {
      dispatch(getItems());
    }

    if (isError) {
      toast.error(message);
    }

    if (!user) {
      navigate('/register');
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <>
      <section>
        <h3>Sell an item:</h3>
        <p>
          Fill out the required fields to add info about an item you want to
          sell.
        </p>
      </section>
      <section>
        <form encType='multipart/form-data' onSubmit={handleSubmit}>
          <input
            type='text'
            id='name'
            name='name'
            value={name}
            placeholder='Enter your username.'
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            name='description'
            id='description'
            cols='30'
            rows='10'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <input
            type='file'
            accept='.png, .jpg, .jpeg'
            name='photo'
            onChange={(e) => setPhoto(e.target.files[0])}
          />

          <button type='submit'>Submit</button>
        </form>
      </section>
      <section>
        <h3>Previously created items by {user.username}:</h3>
        {items.map((item) => (
          <ul key={item._id}>
            <li>{item.itemname}</li>
            <li>{item.description}</li>
            <img
              src={`./images/${item.photo}`}
              alt=''
              style={{ width: '100px', height: 'auto' }}
            />
          </ul>
        ))}
      </section>
    </>
  );
}

export default Sell;
