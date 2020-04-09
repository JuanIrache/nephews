const { deployFolder } = require('./keys');
const fs = require('fs-extra');
const path = require('path');

fs.remove(deployFolder, err => {
  if (err) return console.error(err);
  console.log('Deploy folder deleted');

  fs.copy('./build', deployFolder, err => {
    if (err) return console.error(err);
    console.log('build copied');
  }); // copies directory, even if it has subdirectories or files
});
