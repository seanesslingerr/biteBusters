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


function scraper(p1, p2) {

  console.log("Hello World");

  // Create Varables to store the information scraped.
  let semester = new Array(75);
  let number = new Array(75);
  let credits = new Array(75);
  let grade = new Array(75);

  function name(parameter1, parameter2, parameter3) {
    // code to be executed
  }
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
}

// *****************************************************
// <!-- Section 2 : Connect to DB -->
// *****************************************************

// create `ExpressHandlebars` instance and configure the layouts and partials dir.
const hbs = handlebars.create({
  extname: 'hbs',
  layoutsDir: __dirname + '/ProjectSourceCode/views/layouts',
  partialsDir: __dirname + '/ProjectSourceCode/views/partials',
});

console.log(__dirname, path.join(__dirname, 'src', 'views'));
app.set('views', path.join(__dirname, 'src', 'views')); 
app.use(express.static(path.join(__dirname, 'resources')));

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
app.set('views', path.join(__dirname, 'ProjectSourceCode/views'));
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

app.use('/home', auth);

app.get('/home', (req, res) =>{
  res.render('pages/home');
});

app.get('/login', (req, res) =>{
  res.render('pages/login');
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
//takes input and adds 4 rng numbers
  const n1 = Math. floor(Math. random()*10);
  const n2 = Math. floor(Math. random()*10);
  const n3 = Math. floor(Math. random()*10);
  const n4 = Math. floor(Math. random()*10);
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
    if(user){
      //checks if password matches password
      //if it exists then redirect to the stats (or home) page)
      console.log('Username is available:', username);
      const match = await bcrypt.compare(password, user.password);
      if(match){
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

app.get('/file_upload', async (req, res) => {
  console.log(req);


});


//Server Testing
/*app.listen(3000, '0.0.0.0', () => {
console.log('Server is running on port 3000');
});*/

module.exports = app.listen(3000);

app.get('/welcome', (req, res) => {
  res.json({status: 'success', message: 'Welcome!'});
});

