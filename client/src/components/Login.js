import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import * as actions from '../actions';
import './Sign.css';

const schema = yup.object().shape({
  username: yup.string().required('Username is a required field'),
  password: yup.string().min(4).max(15).required('You must enter a password'),
});
function Login() {
  const history = useHistory();
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
    await dispatch(actions.loginUser(data));
    await dispatch(actions.fetchUser());
    history.push('/');
  };

  return (
    <div className="sign">
      <div className="sign__container">
        <div className="sign__text">
          <h2>
            Sign In to <span className="logo">tripsight</span>
          </h2>
        </div>
        {/* sign form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="sign__inputContainer">
            <PersonIcon />
            <input
              autoComplete="off"
              type="text"
              placeholder="Username"
              name="username"
              {...register('username')}
            />
          </div>
          <p className="error">{errors.username?.message}</p>

          <div className="sign__inputContainer">
            <LockIcon />
            <input
              type="password"
              placeholder="password"
              name="password"
              {...register('password')}
            />
          </div>
          <p className="error">{errors.password?.message}</p>

          <button type="submit">Sign In</button>
        </form>
        <div className="register__text">
          <p>
            No account? sign up{' '}
            <span>
              <Link to="/register">here</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
