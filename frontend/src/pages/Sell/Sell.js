import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createItem, getItems, reset } from '../../features/items/itemsSlice';
import Spinner from '../../components/Spinner/Spinner';
import { toast } from 'react-toastify';

function Sell() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const [category, setCategory] = useState('technology');
  const [brand, setBrand] = useState('apple');
  const [price, setPrice] = useState('');

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
    formData.append('price', price);
    formData.append('category', category);
    formData.append('brand', brand);
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

  const formatDate = (date) => {
    var myDate = new Date(date);
    const day = myDate.toLocaleDateString('en-US');
    const time = myDate.toLocaleString().split(',')[1].trim().substring(0, 4);
    return `${time} ${day}`;
  };

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
            placeholder='Enter products title.'
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            name='description'
            id='description'
            cols='30'
            rows='10'
            placeholder='Enter products description.'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <input
            type='text'
            id='price'
            name='price'
            value={price}
            placeholder='Enter the price.'
            onChange={(e) => setPrice(e.target.value)}
          />

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

          <input
            type='file'
            accept='.png, .jpg, .jpeg'
            name='photo'
            onChange={(e) => setPhoto(e.target.files[0])}
          />

          <button type='submit'>Submit</button>
        </form>
      </section>
      {user && (
        <section>
          <h3>Previously created items by {user.username}:</h3>
          {items.map((item) => (
            <ul key={item._id}>
              <li>{item.itemname}</li>
              <li>{formatDate(item.createdAt)}</li>
            </ul>
          ))}
        </section>
      )}
    </>
  );
}

export default Sell;
