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

module.exports = connection;