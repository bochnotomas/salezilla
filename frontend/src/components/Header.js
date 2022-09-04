import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reset, logout } from '../features/auth/authSlice';

function Header() {
  const { user } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logout());
    dispatch(reset());
    setOpen(!open);
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
            <>
              {user.photo ? (
                <img
                  src={`./images/${user.photo}`}
                  alt=''
                  onClick={() => setOpen(!open)}
                  style={{ cursor: 'pointer' }}
                />
              ) : (
                <img
                  src='./images/profile_pic_placeholder.jpg'
                  alt=''
                  onClick={() => setOpen(!open)}
                  style={{ cursor: 'pointer' }}
                />
              )}

              {open ? (
                <ul>
                  <li>
                    <Link to='/myitems' onClick={() => setOpen(!open)}>
                      My items
                    </Link>
                  </li>
                  <li>
                    <Link to='/settings' onClick={() => setOpen(!open)}>
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogOut}>Log out</button>
                  </li>
                </ul>
              ) : null}
            </>
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
