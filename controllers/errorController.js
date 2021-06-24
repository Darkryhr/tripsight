module.exports = (err, req, res, next) => {
  err.status = err.status || 'devError';
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).send(err.message);
};
