import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import AddBoxIcon from '@material-ui/icons/AddBox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { IconButton } from '@material-ui/core';

import './Vacation.css';
import * as actions from '../actions';

function Vacation({
  destination,
  description,
  img,
  price,
  followers,
  start_date,
  end_date,
  setOpen,
  open,
  id,
  followed,
}) {
  const [checked, setChecked] = useState(false);
  const ref = useRef();
  const dispatch = useDispatch();

  const handleClick = (e) => {
    if (!ref.current.contains(e.target)) setOpen(false);
  };

  const addToFollow = () => {
    if (!checked) {
      dispatch(actions.addFollow(id));
    }
  };

  // const addToFollow = () => {
  //   // if (!followed) {
  //   //   dispatch(actions.addFollow(id));
  //   // }
  //   return (
  //     <CheckBoxIcon
  //       className="vacation__followed"
  //       onClick={() => {
  //         dispatch(actions.removeFollow(id));
  //       }}
  //     />
  //   );
  // };

  useEffect(() => {
    // handle outer click
    document.addEventListener('mousedown', handleClick);
    if (followed) setChecked(true);
    return () => {
      // clean outer click
      document.removeEventListener('mousedown', handleClick);
    };
  });

  return (
    <div className="vacation__background">
      <div
        ref={ref}
        className={`vacation ${
          open ? 'flip-in-hor-bottom' : 'flip-out-hor-top'
        }`}
      >
        <div className="vacation__img">
          <img src={img} alt={destination} />
        </div>
        <div className="vacation__content">
          <div className="vacation__contentHeader">
            <h3 className="vacation__name">{destination}</h3>
            <h3>{price}$</h3>
          </div>
          <div className="vacation__contentInfo">
            <p>{description}</p>
          </div>
          <div className="vacation__contentFooter">
            <h5>{`${start_date} - ${end_date}`}</h5>
            <IconButton
              onClick={() => {
                setChecked(!checked);
                addToFollow();
              }}
            >
              {!checked ? (
                <AddBoxIcon style={{ color: 'white' }} />
              ) : (
                <CheckBoxIcon
                  className="vacation__followed"
                  onClick={() => {
                    dispatch(actions.removeFollow(id));
                  }}
                />
              )}
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vacation;
