import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';

import * as actions from '../actions';
import './Vacation.css';

const schema = yup.object().shape({
  destination: yup.string().required('Vacations must have a name'),
  description: yup
    .string()
    .required('Please give a short description of the vacation'),
  price: yup
    .number('Please enter a valid number')
    .required('Vacation must have a price')
    .positive('Vacation price cannot be negative'),
});

function AddVacation({ add, setAdd }) {
  const ref = useRef();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    await dispatch(actions.addVacation(data));
    setAdd(!add);
  };

  const handleClick = (e) => {
    if (!ref.current.contains(e.target)) setAdd(false);
  };

  useEffect(() => {
    // handle outer click
    document.addEventListener('mousedown', handleClick);
    return () => {
      // clean outer click
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <div className="vacation__background">
      <div className="vacation" ref={ref}>
        <div className="vacation__content">
          <div className="vacation__editForm">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="edit__inputContainer">
                <input
                  type="text"
                  name="destination"
                  {...register('destination')}
                />
              </div>
              <p className="error">{errors.destination?.message}</p>

              <div className="edit__inputContainer">
                <input
                  type="text"
                  name="description"
                  {...register('description')}
                />
              </div>
              <p className="error">{errors.description?.message}</p>

              <div className="edit__inputContainer">
                <input type="text" name="img" {...register('img')} />
              </div>
              <div className="edit__inputContainer">
                <input type="text" name="price" {...register('price')} />
              </div>
              <p className="error">{errors.price?.message}</p>

              <div>
                <p>Followers</p>
                <div>
                  <input
                    type="range"
                    name="followers"
                    id="followers"
                    min="0"
                    max="100"
                    step="1"
                    defaultValue="0"
                    {...register('followers')}
                  />
                </div>
              </div>
              <label htmlFor="start_date">Start Date</label>
              <input
                type="date"
                name="start_date"
                id="start_date"
                {...register('start_date')}
              />
              <label htmlFor="end_date">End Date</label>
              <input
                type="date"
                name="end_date"
                id="end_date"
                {...register('end_date')}
              />
              <button type="submit">Commit</button>
            </form>
          </div>
          <div className="vacation__contentFooter"></div>
        </div>
      </div>
    </div>
  );
}

export default AddVacation;
