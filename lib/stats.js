
const mongo = require('../lib/mongo');

class Stats {

  retrieveUserStats(userId) {
    return new Promise((resolve, reject)=> {
      mongo.getCollection('stats').find({'uid': userId}).toArray()
        .then((stats)=> {
          resolve(stats);
        })
        .catch((error)=> {
          reject(error);
        });
    });
  }

  uploadUserStats(stat) {
    return new Promise((resolve, reject)=> {
      mongo.getCollection('stats').insertOneAsync(stat)
        .then((response)=> {
          resolve(stat);
        })
        .catch((error)=> {
          reject(error);
        });
    });
  }
}

module.exports = new Stats();
