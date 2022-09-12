import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createItem, reset } from '../../features/items/itemsSlice';
import Spinner from '../../components/Spinner/Spinner';
import { toast } from 'react-toastify';
import styles from './Sell.module.scss';

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
  const { isLoading, isSuccess, isError, message } = useSelector(
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
  };

  useEffect(() => {
    if (!user) {
      navigate('/register');
    }

    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success('Item added successfully!');
      navigate('/myitems');
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isSuccess, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  // const formatDate = (date) => {
  //   var myDate = new Date(date);
  //   const day = myDate.toLocaleDateString('en-US');
  //   const time = myDate.toLocaleString().split(',')[1].trim().substring(0, 4);
  //   return `${time} ${day}`;
  // };

  return (
    <div className={styles.container}>
      <form
        encType='multipart/form-data'
        onSubmit={handleSubmit}
        className={styles.container_form}
      >
        <div className={styles.form_left}>
          <div className={styles.form_left_content}>
            {photo ? (
              <img src={URL.createObjectURL(photo)} alt='uploaded_pic' />
            ) : (
              <img src={`./images/itempic_placeholder.jpg`} alt='placeholder' />
            )}

            <input
              type='file'
              accept='.png, .jpg, .jpeg'
              name='photo'
              className={styles.file_button}
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </div>
        </div>

        <div className={styles.form_right}>
          <div className={styles.input_field}>
            <input
              type='text'
              id='name'
              name='name'
              value={name}
              placeholder='name'
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={styles.input_field}>
            <input
              type='text'
              id='price'
              name='price'
              value={price}
              placeholder='price'
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className={styles.input_field}>
            <label>
              category:
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
          </div>
          <div className={styles.input_field}>
            <label>
              brand:
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
          </div>

          <div className={styles.input_field}>
            <textarea
              name='description'
              id='description'
              cols='30'
              rows='10'
              placeholder='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className={styles.button_field}>
            <button type='submit'>Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Sell;
