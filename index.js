const ensureDatabase = require('./data/ensureDatabase');
const express = require('express');
const app = express();

const db = require('./data');

app.use(ensureDatabase);

app.get('/', function(req, res) {
  db.players()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.listen(3000, () => {
  console.log('App is running on 3000!');
});