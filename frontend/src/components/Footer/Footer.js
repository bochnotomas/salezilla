import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { useSelector } from 'react-redux';

function Footer() {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <div className={styles.container_footer}>
        <div className={styles.footer_left}>
          <img
            className={styles.header_content_logo}
            src='./images/logo.svg'
            alt='logo'
          />
          <span>Your number one marketplace</span>
        </div>
        <div className={styles.footer_right}>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/browse'>Browse</Link>
            </li>
            {user ? null : (
              <li>
                <Link to='/register'>Sign Up</Link>
              </li>
            )}

            <li>
              <Link to='/sell'>Sell</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.container_heel}>
        <div className={styles.heel_left}>
          <span>copyright &copy; salezilla 2022</span>
        </div>
        <div className={styles.heel_right}>
          <ul className={styles.socials}>
            <li>
              <img src='./images/socials/facebook.svg' alt='facebook' />
            </li>
            <li>
              <img src='./images/socials/instagram.svg' alt='instagram' />
            </li>
            <li>
              <img src='./images/socials/twitter.svg' alt='twitter' />
            </li>
            <li>
              <img src='./images/socials/paypal.svg' alt='paypal' />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Footer;
