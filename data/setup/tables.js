const shell = require('shelljs');
const async = require('async');
const db = './softball.db';

module.exports = results => {
  console.log('Importing tables...');
  
  // Import Tables
  let funcs = results.map(item => {
    return callback => {
      let cmd = `sqlite3 -init ./data/setup/init.sql ${db} ".import ${item.path} ${item.table}"`;
      console.log(shell.pwd().stdout);
      console.log(cmd);

      shell.exec(cmd, (code, stdout, stderr) => {
        if (stderr.length > 0) {
          console.error('err: '+ stderr);
          callback(stderr);
          return;
        }
        console.log(`Imported table ${item.table} with code ${code}`);
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