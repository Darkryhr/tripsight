const catchAsync = require('../utils/catchAsync');

const connection = require('../connection-wrapper');

let q;

exports.followVacation = catchAsync(async (req, res, next) => {
  q = 'INSERT INTO follows (follower_id, vacation_id) VALUES (?, ?);';
  await connection.executeWithParameters(q, [req.user[0].id, req.params.id]);
  res.status(201).json({ message: 'success' });
});

exports.removeVacation = catchAsync(async (req, res, next) => {
  q = 'DELETE FROM follows WHERE follower_id = ? AND vacation_id = ?;';
  await connection.executeWithParameters(q, [req.user[0].id, req.params.id]);
  res.status(201).json({ message: 'success' });
});

exports.getFollowed = catchAsync(async (req, res, next) => {
  q = `SELECT DISTINCT id FROM follows
  RIGHT JOIN vacations 
  ON follows.vacation_id = vacations.id
  WHERE follower_id = ?`;
  const result = await connection.executeWithParameters(q, req.user[0].id);
  const followed = result.map((follow) => follow.id);
  res.status(201).json({ followed });
});
