import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import * as actions from '../actions';
import AddVacation from './AddVacation';
import AdminThumbs from './AdminThumbs';
import './Dashboard.css';
import { createLoader } from './createLoader';

function AdminDashboard() {
  const [add, setAdd] = useState(false);
  const dispatch = useDispatch();
  const vacations = useSelector((state) => state.vacations);
  useEffect(() => {
    dispatch(actions.getVacations());
  }, []);

  const renderContent = () =>
    vacations.map((vacation) => (
      <AdminThumbs {...vacation} key={vacation.id} />
    ));

  const addVacation = () => {
    setAdd(!add);
  };

  const createDash = () => {
    return (
      <>
        <div className="dashboard">
          <div className="dashboard__container">
            {renderContent()}{' '}
            <div className="add__thumbnail" onClick={() => addVacation()}>
              <IconButton>
                <AddCircleIcon />
              </IconButton>
            </div>
          </div>
        </div>
        {add ? <AddVacation add={add} setAdd={setAdd} /> : ''}
      </>
    );
  };
  return !vacations ? createLoader() : createDash();
}

export default AdminDashboard;
