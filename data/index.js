var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./softball.db');


const players = () => {
  return new Promise((resolve, reject) => {
    db.serialize(function() {
      db.each('SELECT * FROM Players', function(err, row) {
        if (err) {
          reject(err);
          return;
        }
        resolve(row);
      });
    });

    db.close();
  });
};


module.exports = {
  players: players
};