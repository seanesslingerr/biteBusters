console.log("hello world");

const fs = require('node:fs');
fs.readFile('ProjectSourceCode\\BostonAudit.html', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let line = ""
  let lineNo = 1
  let leftRows = 5;
  const usefullRows = ["", "", "", ""];
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
      leftRows = 4;
  }
  if (leftRows < 5) {
    usefullRows[4-leftRows] = line
    leftRows = leftRows - 1;

    if(leftRows === 0) {
      leftRows = 5;
      console.log("Usey")
      console.log(usefullRows)
      usefullRows[0] = "";
      usefullRows[1] = "";
      usefullRows[2] = "";
      usefullRows[3] = "";
    }

  }
    lineNo = lineNo  + 1;
        line = "";
    }
  } 
  
});