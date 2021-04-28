const express = require('express');
const database = require('../database/index.js');
const app = express();
const port = 3003;
const cors = require('cors');
const moment = require('moment');

app.use(cors());
app.options('*', cors());

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());

app.get('/cards', (req, res) => {

  database.query(`select * from goodBoys`, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(results);
    }
  });


})

app.post('/', (req, res) => {

  let result = [];
  req.body.forEach((ele) => {
    const formatTime = moment(ele.creationtime).format('lll');
    result.push(
      [
        ele.name,
        ele.description,
        formatTime,
      ]
    )
  })

  const postQuery = `insert into goodBoys (card_name, card_description, creationtime) values ?`;

  database.query(postQuery, [result], (err, results) => {
    if (err) {
      console.log('err', err);
      res.status(400).send(err);
    } else {
      res.status(200).send(results);
    }
  })

})

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));