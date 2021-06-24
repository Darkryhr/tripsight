const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const keys = require('../config/keys');

// const cache = require('../cache');

const connection = require('../connection-wrapper');

let q;

//* HELPER FUNCTIONS
const signToken = (id) =>
  jwt.sign({ id }, keys.JWT_SECRET, {
    expiresIn: keys.JWT_EXPIRES_IN,
  });

const passwordCompare = async (candidatePassword, userPassword) => {
  const result = await bcrypt.compare(candidatePassword, userPassword);
  return result;
};

//* CRUD
exports.signUp = catchAsync(async (req, res, next) => {
  const { first_name, last_name, username, password } = req.body;
  q = 'SELECT id FROM users WHERE username=?';
  const named = await connection.executeWithParameters(q, username);
  if (named.length) {
    return next(new AppError('This username already exists', 401));
  }
  q = `INSERT INTO users (first_name, last_name, username, password, is_admin) VALUES (?,?, ?, ?, 0)`;
  const passwordHashed = await bcrypt.hash(password, 12);
  const signupValues = [first_name, last_name, username, passwordHashed];
  const user = await connection.executeWithParameters(q, signupValues);
  const token = signToken(user.insertId);
  res.status(201).json({
    message: 'success',
    token,
    data: {
      user,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  // check if exist
  if (!username || !password) return next('provide all creds');
  q = 'SELECT * FROM users WHERE username = ?';
  const user = await connection.executeWithParameters(q, username);
  // check if password is correct
  if (!user[0] || !(await passwordCompare(password, user[0].password)))
    return next(new AppError('Incorrect CREDS', 401));
  // send token to client
  const [userData] = user;
  const token = signToken(user[0].id);
  // cache.set(token, result);
  // if (!token) return next(new AppError('No Token', 400));
  res
    .status(200)
    .json({ status: 'success', token, isAdmin: userData.is_admin });
});

exports.protect = catchAsync(async (req, res, next) => {
  //* 1. check if token is there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else return next(new AppError('No Token', 400));
  if (!token) return next('no token');
  //* 2. verify token
  const decoded = await promisify(jwt.verify)(token, keys.JWT_SECRET);
  //* 3. check if user exists
  q = 'SELECT * FROM users WHERE id = ?';
  const user = await connection.executeWithParameters(q, decoded.id);
  req.user = user;
  next();
});

// * wrap in function so that you can pass parameters into middleware
exports.restrictTo = (role) => async (req, res, next) => {
  if (role !== req.user[0].is_admin) {
    return next(
      new AppError('You do not have permission to perform this action', 403)
    );
  }
  next();
};
