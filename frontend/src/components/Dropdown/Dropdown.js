import React from 'react';
import { Link } from 'react-router-dom';

function Dropdown({ open, setOpen, handleLogOut }) {
  return (
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
  );
}

export default Dropdown;
