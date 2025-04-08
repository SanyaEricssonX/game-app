const fs = require('fs');
const packageJson = require('./package.json');

const content = `window.appVersion = '${packageJson.version}';`;
fs.writeFileSync('./public/version.js', content);