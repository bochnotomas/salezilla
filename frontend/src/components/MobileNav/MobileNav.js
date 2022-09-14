import React from 'react';
import styles from '../Header/Header.module.scss';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { BiMenuAltRight } from 'react-icons/bi';
function MobileNav({
  menuOpen,
  handleToggle,
  user,
  open,
  setOpen,
  handleLogOut,
}) {
  return (
    <div className={styles.header_content}>
      <img
        className={styles.header_content_logo}
        src='./images/logo.svg'
        alt='logo'
      />

      <nav
        className={`${styles.header_content_nav} ${
          menuOpen ? styles.isMenu : ''
        }`}
      >
        <ul>
          <li>
            <Link to='/' onClick={handleToggle}>
              Home
            </Link>
          </li>
          <li>
            <Link to='/browse' onClick={handleToggle}>
              Browse
            </Link>
          </li>
          <li>
            <Link to='/sell' onClick={handleToggle}>
              Sell
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to='/myitems' onClick={handleToggle}>
                  My items
                </Link>
              </li>
              <li>
                <Link to='/settings' onClick={handleToggle}>
                  Settings{' '}
                  {user.photo ? (
                    <img
                      src={`./images/${user.photo}`}
                      alt=''
                      onClick={() => setOpen(!open)}
                      style={{ width: '25px' }}
                    />
                  ) : (
                    <img
                      src='./images/profile_pic_placeholder.jpg'
                      alt=''
                      onClick={() => setOpen(!open)}
                      style={{ width: '25px' }}
                    />
                  )}
                </Link>
              </li>
              <li>
                <button onClick={handleLogOut}>Log out</button>
              </li>
            </>
          ) : (
            <li>
              <Link to='/register' onClick={handleToggle}>
                Sign Up
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <div className={styles.header_content_toggle}>
        {menuOpen ? (
          <AiOutlineClose onClick={handleToggle} />
        ) : (
          <BiMenuAltRight onClick={handleToggle} />
        )}
      </div>
    </div>
  );
}

export default MobileNav;
