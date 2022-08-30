import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reset, logout } from '../features/auth/authSlice';

function Header() {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <>
      <div className='header'>
        <div className='logo'>logo</div>

        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/browse'>Browse</Link>
          </li>
          <li>
            <Link to='/sell'>Sell</Link>
          </li>
          {user ? (
            <li>
              <button onClick={handleLogOut}>Log out</button>
            </li>
          ) : (
            <li>
              <Link to='/register'>Sign Up</Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

export default Header;
