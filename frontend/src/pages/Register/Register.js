import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner/Spinner';
import styles from './Register.module.scss';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    email: '',
    phonenumber: '',
    password: '',
    password2: '',
  });

  const { username, fullname, email, phonenumber, password, password2 } =
    formData;

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error('Passwords do not match!');
    } else {
      const userData = {
        username,
        fullname,
        email,
        phonenumber,
        password,
      };

      dispatch(register(userData));
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }
    if (isSuccess || user) {
      navigate('/');
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h3>Register here:</h3>
        <div className={styles.form_group}>
          <div className={styles.input_field}>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email.'
              onChange={onChange}
            />
          </div>
          <div className={styles.input_field}>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              placeholder='Enter your password.'
              onChange={onChange}
            />
          </div>
          <div className={styles.input_field}>
            <input
              type='password'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Repeat the password.'
              onChange={onChange}
            />
          </div>
          <div className={styles.input_field}>
            <input
              type='text'
              id='username'
              name='username'
              value={username}
              placeholder='Enter your username.'
              onChange={onChange}
            />
          </div>
          <div className={styles.input_field}>
            <input
              type='text'
              id='fullname'
              name='fullname'
              value={fullname}
              placeholder='Enter your full name.'
              onChange={onChange}
            />
          </div>
          <div className={styles.input_field}>
            <input
              type='tel'
              id='phonenumber'
              name='phonenumber'
              value={phonenumber}
              placeholder='Enter your phonenumber.'
              onChange={onChange}
            />
          </div>
          <div className={styles.interactions}>
            <div className={styles.form_link}>
              <p>
                Already have an account? Sign in <Link to='/login'>here.</Link>
              </p>
            </div>
            <div className={styles.button_field}>
              <button type='submit'>submit</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
