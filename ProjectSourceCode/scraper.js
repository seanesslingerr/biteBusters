console.log("hello world");

const fs = require('node:fs');
fs.readFile('ProjectSourceCode\\BostonAudit.html', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let line = ""
  let lineNo = 1
  let flag = false;
  for (let i = 0; i < data.length; i++) {
    if (data[i] !== "\n") {
        line = line + data[i];

    }
    else {
      if (lineNo === 1032) {
        console.log("on");        
        console.log(line);
    }
    if (line === '											<tbody><tr class="takenCourse ">') {
      console.log("sdf");        
      console.log(line);
      flag = true;
  }
    lineNo = lineNo  + 1;
        line = "";
    }
  } 
  
});