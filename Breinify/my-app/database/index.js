const mysql = require('mysql');

const db_config = {
  database: 'doggos',
  user: 'root',
  host: 'localhost',
};

let connection;

connection = mysql.createConnection(db_config);
connection.connect((err) => {
  if (err) {
    console.log('db connection error: ', err);
  } else {
    console.log('Connected: MySQL Started!');
  }
});

// const sqlQuery = 'CREATE TABLE goodBoys (id INT NOT NULL, card_name VARCHAR(50), card_description VARCHAR(1000), creationtime VARCHAR(50))';

// connection.query('DROP DATABASE IF EXISTS doggos; CREATE DATABASE doggos; USE doggos', (err) => {
//   if (err) {
//     console.log('drop database doggos error: ', err);
//   } else {
//     console.log('successfully dropped database doggos')
//   }
// });

// connection.query(sqlQuery, (err) => {
//   if (err) {
//     console.log('error creating table: ', err);
//   } else {
//     console.log('table created');
//   }
// });

module.exports = connection;