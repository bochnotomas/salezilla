import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reset, logout } from './../../features/auth/authSlice';
import styles from './Header.module.scss';
import MobileNav from '../MobileNav/MobileNav';
import DesktopNav from '../DesktopNav/DesktopNav';

function Header() {
  const { user } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logout());
    dispatch(reset());
    setOpen(!open);
    navigate('/');
    setMenuOpen(!menuOpen);
  };

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }

    if (size.width > 768) {
      setIsMobile(false);
    } else if (size.width < 768) {
      setIsMobile(true);
    }
  }, [size.width, menuOpen]);

  console.log(isMobile);

  return (
    <header className={styles.header}>
      {isMobile ? (
        <MobileNav
          open={open}
          menuOpen={menuOpen}
          handleToggle={handleToggle}
          user={user}
          setOpen={setOpen}
          handleLogOut={handleLogOut}
        />
      ) : (
        <DesktopNav
          open={open}
          menuOpen={menuOpen}
          handleToggle={handleToggle}
          user={user}
          setOpen={setOpen}
          handleLogOut={handleLogOut}
        />
      )}
    </header>
  );
}

export default Header;
