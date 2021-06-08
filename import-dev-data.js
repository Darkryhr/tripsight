const fs = require('fs');
const keys = require('./config/keys');
const connection = require('./connection-wrapper');

// READ JSON FILE
const vacations = JSON.parse(
  fs.readFileSync(`${__dirname}/vacations.json`, 'utf-8')
);

let q;

const importData = () => {
  const promArr = [];
  q = 'INSERT INTO vacations SET ?';
  vacations.forEach((vacation) => {
    promArr.push(connection.executeWithParameters(q, vacation));
  });
  Promise.all(promArr)
    .then(() => {
      console.log('Data successfully loaded!');
      process.exit();
    })
    .catch((err) => {
      console.log(err);
      process.exit();
    });
};

// const importData = async () => {
//   try {
//     await connection.executeWithParameters(q, vacations[1]);
//     console.log('Data successfully loaded!');
//   } catch (err) {
//     console.log(err);
//   }
// };

const deleteData = async () => {
  q = 'DELETE FROM vacations';
  try {
    await connection.execute(q);
    console.log('Data deleted successfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
