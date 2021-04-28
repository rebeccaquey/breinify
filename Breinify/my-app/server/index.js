const express = require('express');
// const database = require('../database/index.js');
const app = express();
const port = 3003;
const cors = require('cors');


app.use(cors());
// app.options('*', cors());

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.send('got the get request')
  console.log('test?')
})

app.post('/', (req, res) => {
  res.send("got the post request");
  console.log(req.body);
  // why
})

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));