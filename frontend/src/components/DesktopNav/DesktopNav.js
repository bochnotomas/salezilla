import React from 'react';
import styles from './DesktopNav.module.scss';
import { Link } from 'react-router-dom';
import Dropdown from '../Dropdown/Dropdown';

function DesktopNav({ handleToggle, user, open, setOpen, handleLogOut }) {
  return (
    <div className={styles.header_content}>
      <img
        className={styles.header_content_logo}
        src='./images/logo.svg'
        alt='logo'
      />

      <nav className={styles.header_content_nav}>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/browse'>Browse</Link>
          </li>
          <li id={styles.sell_button}>
            <Link to='/sell'>Sell</Link>
          </li>
          {user ? (
            <>
              {user.photo ? (
                <img
                  src={`./images/${user.photo}`}
                  alt=''
                  onClick={() => setOpen(!open)}
                />
              ) : (
                <img
                  src='./images/profile_pic_placeholder.jpg'
                  alt=''
                  onClick={() => setOpen(!open)}
                />
              )}
              {open ? (
                <Dropdown
                  open={open}
                  setOpen={setOpen}
                  handleLogOut={handleLogOut}
                />
              ) : null}
            </>
          ) : (
            <li id={styles.sign_up_button}>
              <Link to='/register' onClick={handleToggle}>
                Sign Up
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default DesktopNav;
