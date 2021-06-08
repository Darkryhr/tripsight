const catchAsync = require('../utils/catchAsync');
const connection = require('../connection-wrapper');

let q;

exports.getAllVacations = catchAsync(async (req, res, next) => {
  q = 'SELECT * FROM vacations';
  const vacations = await connection.execute(q);
  res.json({ result: vacations });
});

exports.getVacation = catchAsync(async (req, res, next) => {
  q = 'SELECT * FROM vacations WHERE id = ?';
  const vacation = await connection.executeWithParameters(q, req.params.id);
  res.json({ result: vacation });
});

exports.createVacation = catchAsync(async (req, res, next) => {
  q = 'INSERT INTO vacations SET ?';
  const vacation = await connection.executeWithParameters(q, req.body);
  res.status(201).json({ message: 'success', result: vacation });
});

exports.updateVacation = catchAsync(async (req, res, next) => {
  const { body } = req;
  q = 'UPDATE vacations SET ? WHERE id=?';
  await connection.executeWithParameters(q, [body, req.params.id]);
  res.status(200).json({ message: 'success' });
});

exports.deleteVacation = catchAsync(async (req, res, next) => {
  q = 'DELETE FROM vacations WHERE id=?';
  await connection.executeWithParameters(q, req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
