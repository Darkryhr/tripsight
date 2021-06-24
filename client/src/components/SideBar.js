import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { SearchOutlined } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';

import './Sidebar.css';
import * as actions from '../actions';
import Dropdown from './Dropdown';

function SideBar() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const userState = () => {
    switch (user.isAuthenticated) {
      case true:
        return (
          <Dropdown
            name={user.user ? user.user.first_name : 'Loading'}
            isAdmin={user ? user.isAdmin : 0}
          />
        );
      default:
        return <Link to="/login">Login</Link>;
    }
  };

  const onSubmit = (data) => {
    dispatch(actions.searchVacation(data));
    reset();
  };
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <h4 className="sidebar_signPrompt">
          <div>{userState()}</div>
        </h4>
        <h1 className="logo">
          <Link to="/">tripsight</Link>
        </h1>
        <div className="sidebar__search">
          <div className="sidebar__searchContainer">
            <form onSubmit={handleSubmit(onSubmit)}>
              <IconButton>
                <SearchOutlined onClick={handleSubmit(onSubmit)} />
              </IconButton>
              <input
                placeholder="Search"
                name="search"
                {...register('search')}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
