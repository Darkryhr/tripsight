const express = require('express');
const morgan = require('morgan');
const vacationsRoutes = require('./routes/vacationsRoute');
const userRoutes = require('./routes/userRoutes');
const keys = require('./config/keys');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

if (keys.DEV) app.use(morgan('dev'));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});

app.use('/api/v1/vacations', vacationsRoutes);
app.use('/api/v1/users', userRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
// process.on('unhandledRejection', () => {
//   console.log('UNHANDLED REJECTION! 💥 Shutting down...');
//   server.close(() => {
//     process.exit(1);
//   });
// });
