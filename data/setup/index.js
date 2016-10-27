const downloader = require('./downloader');
const tables = require('./tables');
const views = require('./views');

module.exports = {
  setup: () => {
    return downloader
      .download()
      .then(tables)
      .then(views);
  }
};