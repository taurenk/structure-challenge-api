'use strict';

const express = require('express');
const app = express();
const cors = require('cors');

let config = require('./config/config');
let mongo = require('./lib/mongo');

mongo.open(config.mongodb.connectionString)
  .then(()=> {
    console.log('Connected to Mongo!');
  })
  .catch((error)=> {
    console.log(error);
  });

app.use(cors());

let authAPI = require('./routes/auth');
let usersAPI = require('./routes/users');
let statsAPI = require('./routes/stats');
let metricsAPI = require('./routes/metrics');

app.use('/v1/auth', authAPI);
app.use('/v1/users', usersAPI);
app.use('/v1/stats', statsAPI);
app.use('/v1/metrics', metricsAPI);

app.listen(1337, function () {
  console.log('Backend app listening on port 1337!');
});
