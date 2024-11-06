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
const bcrypt = require('bcryptjs'); //  To hash passwords
const axios = require('axios'); // To make HTTP requests from our server. We'll learn more about it in Part C.
app.use(express.static('public')); 

// *****************************************************
// <!-- Section 2 : Connect to DB -->
// *****************************************************

// create `ExpressHandlebars` instance and configure the layouts and partials dir.
const hbs = handlebars.create({
  extname: 'hbs',
<<<<<<< HEAD
  layoutsDir: __dirname + '/ProjectSourceCode/views/layouts',
  partialsDir: __dirname + '/ProjectSourceCode/views/partials',
=======
  layoutsDir: __dirname + '/src/views/layouts',
  partialsDir: __dirname + '/src/views/partials',
>>>>>>> dabfe482c9ce6ac60b5ae8fef5d46947307a0a1e
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
<<<<<<< HEAD
app.set('views', path.join(__dirname, 'ProjectSourceCode/views'));
=======
// app.set('views', path.join(__dirname, 'views'));
>>>>>>> dabfe482c9ce6ac60b5ae8fef5d46947307a0a1e
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

app.get('/home', (req, res) =>{
    res.render('pages/home');
});

app.get('/login', (req, res) =>{
    res.render('pages/login');
});

app.get('/register', (req, res) =>{
    res.render('pages/register');
});

app.get('/stats', (req, res) =>{
    res.render('pages/stats');
})

app.post('/register', (req, res) =>{
    //register page takes input of first name and last name

    //takes input and adds 4 rng numbers

    //tests wether or not 2 letters of first name and 2 of last PLUS 4 rng numbers is a unique identikey

    //takes password and hashes it

    //creates an account, and sends the page a response of identikey and email (which is just identikey + colorado.edu)
    //and the password

});

app.post('/login', (req, res) =>{
    //takes in an identikey
    //if it exists passes through

    //checks if password matches password\
    //if it exists then redirect to the stats (or home) page)

    //if incorrect password, stay on login page but provide response

    //if incorrect identitikey, 
});

//Server Testing
app.listen(3000, '0.0.0.0', () => {
  console.log('Server is running on port 3000');
});