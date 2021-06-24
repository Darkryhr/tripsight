import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';

import EditVacation from './EditVacation';
import './Thumbnail.css';
import * as actions from '../actions';

function AdminThumbs(props) {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);

  const editVacation = () => {
    setEdit(!edit);
  };

  const deleteVacation = () => {
    dispatch(actions.deleteVacation(props.id));
  };

  return (
    <div className="thumb__background">
      <div className="thumbnail mute">
        <img src={props.img} alt={props.destination} />
        <div className="vacation__edit">
          <h2>{props.destination}</h2>
          <div>
            <IconButton onClick={() => editVacation()}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => deleteVacation()}>
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      </div>
      {edit ? <EditVacation {...props} edit={edit} setEdit={setEdit} /> : ''}
    </div>
  );
}

export default AdminThumbs;
