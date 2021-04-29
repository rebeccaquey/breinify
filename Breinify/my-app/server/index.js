const express = require('express');
const database = require('../database/index.js');
const app = express();
const port = 3003;
const cors = require('cors');
const moment = require('moment');

// const redis = require("redis");

// const client = redis.createClient();

// client.on("error", function(error) {
//   console.error(error);
// });

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

  // REDIS: currently gets all cards and stores them to one key; would be better to store each card to an individual id and then only include 20% in the cache

  // client.get(id, (redisGetError, redisData) => {
  //   if (redisGetError) {
  //     res.status(500).json({ redisGetError });
  //     return;
  //   }
  //   if (redisData) {
  //     // JSON objects need to be parsed after reading from redis, since it is stringified before being stored into cache
  //     let data = JSON.parse(redisData);
  //     res.status(200).json(data);
  //     console.log('redis has data');
  //   } else {
  //     database.query(`select * from goodBoys`, (err, results) => {
  //       if (err) {
  //         res.status(404).send(err);
  //       } else {
  //         res.status(200).send(results);
  //         client.set(results.id, JSON.stringify(results), (redisSetError, result) => {
  //           if (redisSetError) {
  //             res.status(500).json({ redisSetError });
  //           }
  //         });
  //         console.log('redis set the data')
  //       }
  //     });
  //   }
  // });


});

// let idCount = 1;

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

    // REDIS: set keys to id and value to the card object
    // client.set(idCount, JSON.stringify(ele), (redisSetError, result) => {
    //   if (redisSetError) {
    //     res.status(500).json({ redisSetError });
    //   }
    // });
    // idCount++;

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
});

app.delete('/cards/:id', (req, res) => {
  // console.log(req.params.id);

  database.query(`delete from goodBoys where id = ${req.params.id}`, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(results);
    }
  });
});

app.patch('/cards/:id', (req, res) => {
  // console.log(req.body.card_name, req.params.id)

  database.query(`update goodBoys set card_name = '${req.body.card_name}' where id = ${req.params.id}`, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(results);
    }
  })

  // REDIS: set the id to the new result
  // const { id } = req.params;
  // database.query(`update goodBoys set card_name = '${req.body.card_name}' where id = ${id}`, (err, results) => {
  //   if (err) {
  //     res.status(404).send(err);
  //   } else {
  //     res.status(200).send(results);
  //     client.set(id, JSON.stringify(results), (redisSetError, result) => {
  //       if (redisSetError) {
  //         res.status(500).json({ redisSetError });
  //       }
  //     });
  //   }
  // })
});


app.listen(port, () => console.log(`Server listening on http://localhost:${port}`))