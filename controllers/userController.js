const catchAsync = require('../utils/catchAsync');
const connection = require('../connection-wrapper');
const Cache = require('../cache');

let q;

exports.getAllUsers = catchAsync(async (req, res, next) => {
  if (!Cache.has('allUsers') || Cache.isExpired('allUsers')) {
    q = 'SELECT * FROM users';
    const users = await connection.execute(q);
    Cache.set('allUsers', users);
  }
  res.status(200).json({ message: 'success', data: Cache.get('allUsers') });
});

exports.getUser = catchAsync(async (req, res, next) => {
  if (
    !Cache.has(`user_${req.user[0].id}`) ||
    Cache.isExpired(`user_${req.user[0].id}`)
  ) {
    q = 'SELECT * FROM users WHERE id = ?';
    const user = await connection.executeWithParameters(q, req.user[0].id);
    Cache.set(`user_${req.user[0].id}`, user);
  }
  res
    .status(200)
    .json({ message: 'success', data: Cache.get(`user_${req.user[0].id}`) });
});

exports.addUser = catchAsync(async (req, res, next) => {
  q = 'INSERT INTO users SET ?';
  await connection.executeWithParameters(q, req.body);
  res.status(201).json({ message: 'success' });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  q = 'DELETE FROM users WHERE id=?';
  await connection.executeWithParameters(q, req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { body } = req;
  q = 'UPDATE users SET ? WHERE id=?';
  await connection.executeWithParameters(q, [body, req.params.id]);
  res.status(200).json({ message: 'success' });
});
