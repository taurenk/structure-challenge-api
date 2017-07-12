
const mongo = require('../lib/mongo');

class Metrics {

  getLeaderboard() {
    return new Promise((resolve, reject)=> {
      
      let leaderboard = {};

      mongo.getCollection('users').find({}).toArray()
        .then((users)=> {

          users.forEach((user)=> {
            leaderboard[user._id] = {
              totalTrips: 0,
              name: user.name
            }
          });

          return  mongo.getCollection('stats').find({}).toArray();
        })
        .then((stats)=> {
         
          stats.forEach((stat)=> {
            console.log(stat);
            let totalTrips = stat.trips;
            totalTrips += leaderboard[stat.uid].totalTrips;
            leaderboard[stat.uid]['totalTrips'] = totalTrips;
          });

          let leaderboardArray = [];
          Object.keys(leaderboard).forEach((key)=> {
            leaderboardArray.push({
              uid: key,
              name: leaderboard[key]['name'],
              totalTrips: leaderboard[key]['totalTrips']
            });
          });
          leaderboardArray.sort(this.sortLeaderboard);
          resolve(leaderboardArray);
        })
        .catch((error)=> {
          reject(error);
        });
    });
  }

  sortLeaderboard(a, b) {
    return a.totalTrips - b.totalTrips;
  }

}

module.exports = new Metrics();
