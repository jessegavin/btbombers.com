const https = require('https');
const fs = require('fs');
const async = require('async');
const Promise = require('bluebird');
const doc = require('./google-sheets.js');

let funcs = doc.sheets.map(item => {
  return callback => {

    if (!fs.existsSync('./tmp')) {
      fs.mkdirSync('./tmp');
    }

    let result = {
      path: `./tmp/${item.table}.csv`,
      table: item.table
    };

    // if (fs.exists(result.path)) {
    //   return callback(null, result);
    // }

    let file = fs.createWriteStream(result.path);
    https.get(doc.url(item.gid), response => {
      response.pipe(file);
      console.log(`Downloaded ${item.table}`);
      callback(null, result);
    });
  };
});

let download = () => {
  console.log('Downloading spreadsheets...');
  return new Promise((resolve, reject) => {
    async.parallel(funcs, function(err, results) {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

module.exports = {
  download: download
};