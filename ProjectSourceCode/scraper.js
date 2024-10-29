console.log("hello world");

const fs = require('node:fs');
fs.readFile('ProjectSourceCode\\BostonAudit.html', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data[60]);
  
});