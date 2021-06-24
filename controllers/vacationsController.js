const catchAsync = require('../utils/catchAsync');
const connection = require('../connection-wrapper');
const Cache = require('../cache');

let q;

exports.getAllVacations = catchAsync(async (req, res, next) => {
  if (!Cache.has('vacations') || Cache.isExpired('vacations', 60)) {
    q = 'SELECT * FROM vacations';
    const vacations = await connection.execute(q);
    Cache.set('vacations', vacations);
  }
  res.status(200).json({ result: Cache.get('vacations') });
});

exports.getVacation = catchAsync(async (req, res, next) => {
  if (
    !Cache.has(`vacation_${req.params.id}`) ||
    Cache.isExpired(`vacation_${req.params.id}`)
  ) {
    q = 'SELECT * FROM vacations WHERE id = ?';
    const vacation = await connection.executeWithParameters(q, req.params.id);
    Cache.set(`vacation_${req.params.id}`, vacation);
  }
  res.status(200).json({ result: Cache.get(`vacation_${req.params.id}`) });
});

exports.createVacation = catchAsync(async (req, res, next) => {
  const {
    destination,
    description,
    img,
    price,
    start_date,
    end_date,
    followers,
  } = req.body;
  const returnValue = {
    destination,
    description,
    img,
    price,
    start_date,
    end_date,
    followers,
  };
  returnValue.followers = +returnValue.followers;
  q = `INSERT INTO vacations (destination, description,img, price, start_date, end_date,followers)
  VALUES (?,?,?,?,?,?,?);`;
  const vacationValues = [
    destination,
    description,
    img,
    price,
    start_date,
    end_date,
    followers,
  ];
  const vacation = await connection.executeWithParameters(q, vacationValues);
  res.status(201).json({ message: 'success', result: returnValue });
});

exports.updateVacation = catchAsync(async (req, res, next) => {
  const { body } = req;
  q = 'UPDATE vacations SET ? WHERE id=?';
  await connection.executeWithParameters(q, [body, req.params.id]);
  q = 'SELECT * FROM vacations WHERE id = ?';
  const vacation = await connection.executeWithParameters(q, req.params.id);
  res.status(200).json({ message: 'success', result: vacation });
});

exports.deleteVacation = catchAsync(async (req, res, next) => {
  q = 'DELETE FROM follows WHERE vacation_id = ?';
  await connection.executeWithParameters(q, req.params.id);
  q = 'DELETE FROM vacations WHERE id=?';
  await connection.executeWithParameters(q, req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
