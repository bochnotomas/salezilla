import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePfp, reset } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import { toast } from 'react-toastify';

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
    <>
      <section>
        <h3>Settings Page:</h3>
        <div>
          <ul>
            <li>{user.username}</li>
            <li>{user.fullname}</li>
            <li>{user.email}</li>
            <li>{user.phonenumber}</li>
            {user.photo ? (
              <>
                <li>{user.photo}</li>
                <li>
                  <img src={`./images/${user.photo}`} alt='' />
                </li>
              </>
            ) : (
              <li>No user photo yet</li>
            )}
          </ul>
        </div>
      </section>
      <section>
        <form encType='multipart/form-data' onSubmit={onSubmit}>
          <input
            type='file'
            accept='.png, .jpg, .jpeg'
            name='photo'
            onChange={(e) => setPhoto(e.target.files[0])}
          />

          <button type='submit'>Submit</button>
        </form>
      </section>
    </>
  );
}

export default Settings;
