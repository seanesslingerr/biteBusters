console.log("hello world");

// Create Varables to store the information scraped.
let semester = new Array(75);
let number = new Array(75);
let credits = new Array(75);
let grade = new Array(75);


// Reading in the file -- currently hardcoded to be my audit
const fs = require('node:fs');
fs.readFile('ProjectSourceCode\\BostonAudit.html', 'utf8', (err, data) => {

  // Error Handliing
  if (err) {
    console.error(err);
    return;
  }

  // Define Varables
  let line = ""
  let lineNo = 1
  let leftRows = 5;
  let fill = 0
  const usefullRows = ["", "", "", ""];


  for (let i = 0; i < data.length; i++) {

    // If the line terminator is not found than keep adding chars to the line
    if (data[i] !== "\n") {
        line = line + data[i];

    }
    // if you do find the line terminator then you are at the end of a line, so do
    else {
      
      //if (lineNo === 1032) { {{ FINDING THE LINE }}
      //  console.log("on");        
      //  console.log(line);
      //}

      // If we should be reaing the data in, triggered by other if statment below
      if (leftRows < 5) {

        //Fill the usefull rows array with the usefull lines
        usefullRows[4-leftRows] = line;
        leftRows = leftRows - 1;

        // If the whole set of usefull for this indivdual class has been looked through
        if(leftRows === 0) {
          leftRows = 5;
          //console.log(usefullRows[0]);

          // Fill the arrays and console log for debug
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
  
    // The line is the line right above the info we need about a class, it start the process of reading in the data
    if (line === '											<tbody><tr class="takenCourse ">') {
      leftRows = 4;
    }

    // end of loop housekeeping
    lineNo = lineNo  + 1;
        line = "";
    }
  } 
  // log for debugging
  console.log(semester);
  console.log(number);
  console.log(credits);
  console.log(grade);

});
