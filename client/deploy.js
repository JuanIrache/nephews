// Copies the build to the specified public directory

const fs = require('fs-extra');
const path = require('path');

require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });

const { REACT_APP_DEPLOY } = process.env;

fs.remove(REACT_APP_DEPLOY, err => {
  if (err) return console.error(err);
  console.log('Deploy folder deleted');

  fs.copy('./build', REACT_APP_DEPLOY, err => {
    if (err) return console.error(err);
    console.log('build copied');
  }); // copies directory, even if it has subdirectories or files
});
