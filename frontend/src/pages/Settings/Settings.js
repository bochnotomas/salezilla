import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePfp, reset } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import { toast } from 'react-toastify';
import styles from './Settings.module.scss';

function Settings() {
  const [photo, setPhoto] = useState('');

  const { user, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('photo', photo);
    dispatch(updatePfp(formData));
    toast.success('Profile picture updated, please re-log to see the changes.');
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      navigate('/register');
    }
  }, [user, navigate, isError, isSuccess, message, dispatch]);

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.image_form}>
        {photo ? (
          <img src={URL.createObjectURL(photo)} alt='uploaded_pic' />
        ) : (
          <>
            {user.photo ? (
              <img src={`./images/${user.photo}`} alt='pfp' />
            ) : (
              <img src='./images/profile_pic_placeholder.jpg' alt='pfp' />
            )}
          </>
        )}

        <form encType='multipart/form-data' onSubmit={onSubmit}>
          <input
            type='file'
            accept='.png, .jpg, .jpeg'
            name='photo'
            onChange={(e) => setPhoto(e.target.files[0])}
            className={styles.file_button}
          />
          <button type='submit'>Submit</button>
        </form>
      </div>
      <div className={styles.user_info_wrapper}>
        <div className={styles.grid_cell}>
          <label>Username:</label> <p>{user.username}</p>
        </div>
        <div className={styles.grid_cell}>
          <label>Full name:</label> <p>{user.fullname}</p>
        </div>
        <div className={styles.grid_cell}>
          <label>Email:</label> <p>{user.email}</p>
        </div>
        <div className={styles.grid_cell}>
          <label>Phonenumber:</label> <p>{user.phonenumber}</p>
        </div>
      </div>
    </div>
  );
}

export default Settings;
