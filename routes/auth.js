'use-strict';

const express = require('express');
const Auth = require('../lib/auth');
let api = express.Router();

const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

errorHandler = (err, res) => {
  if (err.statusCode) { res.status(err.statusCode); };
  if (err.name) { res.name = err.name; };
  return res.json({error: err});
}


api.post('/login', jsonParser, async (req, res) => {
  let email = req.body.email;
  let password = Auth.encrypt(req.body.password);
  try {
    let token = await Auth.login(email, password);
    res.json({token});
  } catch (error) {
    console.log(error);
    errorHandler(error, res);
  }
});

module.exports = api;
