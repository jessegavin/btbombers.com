const shell = require('shelljs');
const async = require('async');
const db = './softball.db';

module.exports = () => {
  console.log('Importing views...');
  // Create Views
  const views = [
    'SeasonStatsQuery',
    'StatsQuery',
    'GameByGameQuery',
    'BoxScoreQuery'
  ];

  // Import Tables
  let funcs = views.map(view => {
    return callback => {
      let cmd = `sqlite3 -init ./data/setup/init.sql ${db} < ./sql-views/${view}.sql`;
      shell.exec(cmd, (code, stdout, stderr) => {
        if (stderr.length > 0) {
          callback(stderr);
          console.error(stderr);
          return;
        }

        console.log(`Imported view ${view}`);
        callback(null, stdout);
      });
    };
  });

  return new Promise((resolve, reject) => {
    async.series(funcs, function(err, results) {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};