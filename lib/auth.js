
const jwt = require('jsonwebtoken');
const Promise = require('bluebird');
const crypto = require('crypto');
const mongo = require('../lib/mongo');
const config = require('../config/config');

const algorithm = config.algorithm;
const privateKey = config.privateKey;


class Auth {

  login (email, password) {
    return new Promise((resolve, reject)=> {
      mongo.getCollection('users').findOneAsync({'email': email, 'password': password})
        .then((foundUser)=> {

          if (foundUser === null) {
            reject('user not found');
          } else {
            let tokenData = {
              email: foundUser.email,
              id: foundUser._id
            };
            let token = jwt.sign(tokenData, privateKey);
            resolve(token);
          }
        })
        .catch((error)=> {
          reject(error);
        });
    });
  }

  verifyToken(req, res, next) {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
      res.json({error: 'Invalid token.'});
    } else {
      let token = authHeader.split(' ')[1];
      jwt.verify(token, privateKey, (err, decoded)=> {
        if (err) {
          return res.json({error: 'Invalid token.'});
        } else {
          req.decoded = decoded;
          next();
        }
      });
    }
  }

  decrypt(password) {
    var decipher = crypto.createDecipher(algorithm, privateKey);
    var dec = decipher.update(password, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  }

  encrypt(password) {
    var cipher = crypto.createCipher(algorithm, privateKey);
    var crypted = cipher.update(password, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  }
}


module.exports = new Auth();
