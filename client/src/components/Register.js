import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// import { Link } from 'react-router-dom';

import * as actions from '../actions';
import './Sign.css';

const schema = yup.object().shape({
  first_name: yup
    .string()
    .required('First name is a required field')
    .matches(/^([^0-9]*)$/, 'First name should not contain numbers'),
  last_name: yup
    .string()
    .required('Last name is a required field')
    .matches(/^([^0-9]*)$/, 'Last name should not contain numbers'),
  username: yup.string().required('Username is a required field'),
  password: yup.string().min(4).max(15).required('You must enter a password'),
});

function Register() {
  const history = useHistory();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const auth = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    await dispatch(actions.registerUser(data));
    await dispatch(actions.fetchUser());
    history.push('/');
  };

  return (
    <div className="sign">
      <div className="sign__container">
        <div className="sign__text">
          <h2>
            Sign Up for <span className="logo">tripsight</span>
          </h2>
        </div>
        {/* sign form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="sign__inputContainer">
            <input
              type="text"
              placeholder="First Name*"
              name="first_name"
              {...register('first_name')}
            />
          </div>
          <p className="error">{errors.first_name?.message}</p>
          <div className="sign__inputContainer">
            <input
              type="text"
              placeholder="Last Name*"
              name="last_name"
              {...register('last_name')}
            />
          </div>
          <p className="error">{errors.last_name?.message}</p>

          <div className="sign__inputContainer">
            <input
              type="text"
              placeholder="Username*"
              name="username"
              {...register('username')}
            />
          </div>
          <p className="error">{errors.username?.message}</p>

          <div className="sign__inputContainer">
            <input
              type="password"
              placeholder="password*"
              name="password"
              {...register('password')}
            />
          </div>
          <p className="error">{errors.password?.message}</p>
          <button type="submit">Sign Up</button>
          {error ? <p style={{ color: 'white' }}>{error.message}</p> : ''}
        </form>
      </div>
    </div>
  );
}

export default Register;
