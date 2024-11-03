console.log("hello world");


let semester = new Array(75);
let number = new Array(75);
let credits = new Array(75);
let grade = new Array(75);

for (let i = 0; i < 75; i++) {
  semester[i] = "";
  number[i] = "";
  credits[i] = "";
  grade[i] = "";
}



const fs = require('node:fs');
fs.readFile('ProjectSourceCode\\BostonAudit.html', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let line = ""
  let lineNo = 1
  let leftRows = 5;
  let fill = 0
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

  if (leftRows < 5) {
    usefullRows[4-leftRows] = line;
    leftRows = leftRows - 1;

    if(leftRows === 0) {
      leftRows = 5;
      //console.log(usefullRows[0]);
      semester[fill] = usefullRows[0].slice(54,58);
      number[fill] = usefullRows[1].slice(58,66);
      credits[fill] = usefullRows[2].slice(59,62);
      grade[fill] = usefullRows[3].slice(56,57);
      fill = fill+1;
      //console.log("found");
      console.log(usefullRows[0].slice(54,58));
      console.log(usefullRows[1].slice(58,66));
      console.log(usefullRows[2].slice(59,62));
      console.log(usefullRows[3].slice(56,57));
      console.log("");

      usefullRows[0] = "";
      usefullRows[1] = "";
      usefullRows[2] = "";
      usefullRows[3] = "";
    }


  }
  if (line === '											<tbody><tr class="takenCourse ">') {
    leftRows = 4;
}
    lineNo = lineNo  + 1;
        line = "";
    }
  } 
  console.log(semester);
  console.log(number);
  console.log(credits);
  console.log(grade);

});
