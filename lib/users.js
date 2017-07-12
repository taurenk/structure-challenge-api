
const Promise = require('bluebird');
const mongo = require('../lib/mongo');
let Auth = require('../lib/auth');
let ObjectId = require('mongodb').ObjectId;

class Users {

  retrieveUserById(userId) {
    return new Promise((resolve, reject)=> {
      mongo.getCollection('users').findOneAsync({'_id': ObjectId(userId)})
        .then((foundUser)=> {
          if (foundUser === null) {
            reject('User Not Found');
          } else {
            delete foundUser.password;
            resolve(foundUser);
          }
        })
        .catch((error)=> {
          reject(error);
        });

    });
  }

  createUser(email, name, password) {
    return new Promise((resolve, reject)=> {
      mongo.getCollection('users').findOneAsync({'email': email})
        .then((foundUser)=> {
          if (foundUser) {
            reject('User with that email all ready exists.');
          }
          let newUserRecord = {
            email: email,
            name: name,
            password: Auth.encrypt(password)
          };
          return mongo.getCollection('users').insertOneAsync(newUserRecord);
        })
        .then((result)=> {
          resolve(result);
        })
        .catch((error)=> {
          reject(error);
        });
    });
  }
}

module.exports = new Users();
