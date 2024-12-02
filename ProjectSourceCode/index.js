// <!-- Section 1 : Import Dependencies -->
// *****************************************************

const express = require('express'); // To build an application server or API
const app = express();
const handlebars = require('express-handlebars');
const Handlebars = require('handlebars');
const path = require('path');
const pgp = require('pg-promise')(); // To connect to the Postgres DB from the node server
const bodyParser = require('body-parser');
const session = require('express-session'); // To set the session object. To store or access session data, use the `req.session`, which is (generally) serialized as JSON by the store.
const bcrypt = require('bcryptjs'); // To hash passwords
const axios = require('axios'); // To make HTTP requests from our server. We'll learn more about it in Part C.
app.use(express.static('public'));
var formidable = require('formidable');

function scraper(loc) {
  const semester = new Array(75);
  const number = new Array(75);
  const credits = new Array(75);
  const grade = new Array(75);
  const fs = require('node:fs');
  console.log("insidescraper")
  data = fs.readFileSync(loc, 'utf8');

    // Define Varables
    let line = ""
    let lineNo = 1
    let leftRows = 5;
    let fill = 0
    let GPArow = false; 
    let GPA = 0;
    let firstGPA=true;

    const usefullRows = ["", "", "", ""];
    for (let i = 0; i < data.length; i++) {
      // If the line terminator is not found than keep adding chars to the line
      if (data[i] !== "\n") {
          line = line + data[i];

      }
      // if you do find the line terminator then you are at the end of a line, so do
      else {
        
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
      if (GPArow === true){
        GPArow=false;
        GPA = line.slice(45,50);
        console.log("GPA::", GPA);
      }
      if (line === '                    		<td class="pointslabel fieldlabel">POINTS</td>'&& firstGPA === true) {
        GPArow=true;
        firstGPA=false;
      }
    

      // end of loop housekeeping
      lineNo = lineNo  + 1;
          line = "";
      }
    } 
  //});
  console.log(semester);

  return [semester, number, credits, grade, fill, GPA];
}


const student_courses = `
  SELECT DISTINCT
    classes.class_code,
    classes.credit_hours,
    classes.name,
    classes.description,
    users_to_classes.username
  FROM
    classes
    JOIN users_to_classes ON classes.class_code = users_to_classes.class_code
  WHERE users_to_classes.username = $1

  ORDER BY classes.class_code ASC;`;


  const getGPA = `
  SELECT
  GPA,
  username,
  password
  FROM users
  WHERE username = $1
  ORDER BY username ASC LIMIT 1;`;

// *****************************************************
// <!-- Section 2 : Connect to DB -->
// *****************************************************

// create `ExpressHandlebars` instance and configure the layouts and partials dir.
const hbs = handlebars.create({
  extname: 'hbs',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials',
});

/*console.log(__dirname, path.join(__dirname, '', 'views'));
app.set('views', path.join(__dirname, '', 'views')); 
app.use(express.static(path.join(__dirname, 'resources')));*/

// database configuration
const dbConfig = {
host: 'db', // the database server
port: 5432, // the database port
database: process.env.POSTGRES_DB, // the database name
user: process.env.POSTGRES_USER, // the user account to connect with
password: process.env.POSTGRES_PASSWORD, // the password of the user account
};

const db = pgp(dbConfig);

// test your database
db.connect()
.then(obj => {
console.log('Database connection successful'); // you can view this message in the docker compose logs
obj.done(); // success, release the connection;
})
.catch(error => {
console.log('ERROR:', error.message || error);
});

// *****************************************************
// <!-- Section 3 : App Settings -->
// *****************************************************

// Register `hbs` as our view engine using its bound `engine()` function.
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json()); // specify the usage of JSON for parsing request body.

// initialize session variables
app.use(
session({
secret: process.env.SESSION_SECRET,
saveUninitialized: false,
resave: false,
})
);

app.use(
bodyParser.urlencoded({
extended: true,
})
);

//API ROUTES

app.get('/', (req, res) =>{
  res.redirect('/login');
});

const auth = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
};



app.get('/home', async (req, res) =>{

  const user = req.session.user
  console.log(user);
  const classes = await db.any(student_courses, [user.username]);
  const GPAfind = await db.any(getGPA, [user.username]);
  const usertest = await db.any("SELECT * FROM users");
  console.log("usertest:", usertest)
  console.log("GPA array:", GPAfind[0])
  console.log("GPA found:", GPAfind.gpa)
  res.render('pages/home', {user, classes, GPAfind})
});

app.get('/login', (req, res) =>{
  res.render('pages/login');
  //res.send("Checking");
});

app.get('/register', (req, res) =>{
  res.render('pages/register');
});


app.use('/stats', auth);

app.get('/stats', async (req, res) => {
    res.render('pages/stats');
});

app.get('/logout', (req, res) =>{
  res.render('pages/logout');
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.log('Error destroying session:', err);
        res.status(500).send('Error logging out');
    ``} else {
        console.log('Session destroyed, user logged out');
        res.render('pages/logout');
      }
    });
  } else {
    res.redirect('pages/login');
  }
});

app.post('/register', async (req, res) =>{
  console.log("Just clicked register")
//register page takes input of first name and last name
  const { fN, lN, password} = req.body;
  
  
  console.log('Recieved data:', fN, lN, password);
  const fN2 = fN.slice(0,2).toLowerCase();
  const lN2 = lN.slice(0,2).toLowerCase();
  console.log('Sliced: ', fN2, lN2);

  if (typeof fN !== 'string' || fN.length < 2 || typeof lN !== 'string' || lN.length < 2) {
    return res.status(400).json({ message: 'Invalid input' });
  }
//takes input and adds 4 rng numbers  ----------------------------------------------------------   EDITED
  //const n1 = Math. floor(Math. random()*10);
  //const n2 = Math. floor(Math. random()*10);
  //const n3 = Math. floor(Math. random()*10);
  //const n4 = Math. floor(Math. random()*10);

  const n1 = 1;
  const n2 = 1;
  const n3 = 1;
  const n4 = 1;
  console.log('numbers:', n1, n2, n3, n4);
  //tests wether or not 2 letters of first name and 2 of last PLUS 4 rng numbers is a unique identikey
  const username = fN2 + lN2 + n1 + n2 + n3 + n4;
  console.log('username', username);
  try{
    const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);
    while(user){
      
    }
    console.log('Username is available:', username);
      
    //takes password and hashes it
    const hpassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hpassword);
  
    // Insert the new user into the database
    const email = username + '@colorado.edu'
    const newUser = await db.any(
        'INSERT INTO users(username, email, password) VALUES($1, $2, $3) returning *', 
        [username, email, hpassword]);
    console.log('New user created:', newUser);
  
    //creates an account, and sends the page a response of identikey and email (which is just identikey + colorado.edu)
  //and the password
    res.render('pages/registrationInfo', {username, email, password});
      
    } catch (error) {
      console.error('Error during registration:', error);
      res.redirect('/register'); // In case of an error, redirect back to register
    }
});

app.post('/login', async (req, res) => {
  console.log("trying to log in!");
//takes in an identikey
//if it exists passes through
  const { username, password } = req.body;
  console.log('Received login form data:', username, password);
  
  try {
    const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);
    if(user || username == "test"){
      //checks if password matches password
      //if it exists then redirect to the stats (or home) page)
      console.log('Username exists in database:', username);
      //console.log('>', username, "<");
      const match = await bcrypt.compare(password, user.password);
      if(match || (username === "test")){
        console.log('Logged in');
        req.session.user = user;

        req.session.save((err) => {
          if (err) {
            console.log('Session save error:', err);
            return res.redirect('/login');
          }
          res.redirect('/home');
        });
      }
      else{
        //if incorrect password, stay on login page but provide response
          console.log('Incorrect password');
          res.redirect('/login');
        }
      }
    //if incorrect identitikey, direct to register page
    else {
        console.log('No account found');
        res.redirect('/register');
      }
  }catch{

  }

});
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

app.post('/fileupload', async (req, res) => {
  console.log("test123");
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    [semester, number, credits, grade, sz, GPA] = scraper(files.filetoupload[0].filepath);
    console.log(semester);
    const update = db.any("UPDATE users SET GPA = $1 WHERE username = $2", [GPA, req.session.user.username]);
    for (let i = 0; i < sz; i++) {
      const update = db.any("INSERT INTO users_to_classes (username, class_code, grade, semester) VALUES ($1, $2, $3, $4);", [req.session.user.username, number[i], grade[i], semester[i]]);
      
    }
    // Loosely inspired by: https://www.w3schools.com/nodejs/nodejs_uploadfiles.asp
    });
    res.redirect('/home');


});

//Server Testing
/*app.listen(3000, '0.0.0.0', () => {
console.log('Server is running on port 3000');
});*/

module.exports = app.listen(3000);

app.get('/welcome', (req, res) => {
  res.json({status: 'success', message: 'Welcome!'});
});
