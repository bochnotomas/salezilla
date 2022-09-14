import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { reset, login } from '../../features/auth/authSlice';
import Spinner from '../../components/Spinner/Spinner';
import styles from './Login.module.scss';
import { Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const { user, isLoading, isSuccess, isError, message } = useSelector(
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
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }

    if (user || isSuccess) {
      navigate('/');
      toast.success('Login successful!');
    }

    // dispatch(reset());
  }, [user, isSuccess, isError, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h3>Login here:</h3>
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
          <div className={styles.interactions}>
            <div className={styles.form_link}>
              <p>
                No account? Sign up <Link to='/register'>here.</Link>
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

export default Login;
