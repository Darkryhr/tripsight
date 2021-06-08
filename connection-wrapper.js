const mysql = require('mysql');
const keys = require('./config/keys');

const connection = mysql.createConnection({
  host: 'localhost',
  user: keys.DB_USER,
  password: keys.DB_PASSWORD,
  database: 'vacationsite',
  dateStrings: 'date',
});

connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('DB connected');
});

function execute(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

function executeWithParameters(sql, parameters) {
  return new Promise((resolve, reject) => {
    connection.query(sql, parameters, (err, result) => {
      if (err) {
        console.log('Failed interacting with DB, calling reject');
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

module.exports = {
  execute,
  executeWithParameters,
};
