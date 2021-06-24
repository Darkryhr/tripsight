import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as actions from '../actions';
import './Dropdown.css';

function Dropdown({ children, name, isAdmin }) {
  function DropdownItem({ children }) {
    return <li>{children}</li>;
  }
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const logOut = () => {
    dispatch(actions.logoutUser());
  };

  const handleClick = (e) => {
    if (!ref.current.contains(e.target)) setOpen(false);
  };

  let ref = useRef();
  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      // clean outer click
      document.removeEventListener('mousedown', handleClick);
    };
  });

  const renderAdminFunc = () => {
    return (
      <>
        <DropdownItem>
          <Link to="/graph">Graph</Link>
        </DropdownItem>
      </>
    );
  };
  return (
    <nav ref={ref}>
      <ul className="dropdown">
        <li onClick={() => setOpen(!open)}>
          <h4>{`Hello, ${name}`}</h4>
        </li>
        {open && (
          <>
            <DropdownItem>
              <Link to="/" onClick={logOut}>
                Logout
              </Link>
            </DropdownItem>
            <DropdownItem>Profile</DropdownItem>
            {isAdmin === 1 ? renderAdminFunc() : ''}
          </>
        )}
      </ul>
    </nav>
  );
}

export default Dropdown;
