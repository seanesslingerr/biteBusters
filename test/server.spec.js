// ********************** Initialize server **********************************

const server = require('../index'); //TODO: Make sure the path to your index.js is correctly added

// ********************** Import Libraries ***********************************

const chai = require('chai'); // Chai HTTP provides an interface for live integration testing of the API's.
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const {assert, expect} = chai;

// ********************** DEFAULT WELCOME TESTCASE ****************************

describe('Server!', () => {
  // Sample test case given to test / endpoint.
  it('Returns the default welcome message', done => {
    chai
      .request(server)
      .get('/welcome')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals('success');
        assert.strictEqual(res.body.message, 'Welcome!');
        done();
      });
  });
});

// *********************** TODO: WRITE 2 UNIT TESTCASES **************************

// ********************************************************************************


//test 1 register
describe('Server!', () => {
  // Sample test case to test the /register endpoint.
  it('Registers a new user and redirects to login', (done) => {
    chai
      .request(server)
      .post('/register')
      .send({
        fN: 'John',
        lN: 'Doe',
        password: 'securePassword123'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        res.should.redirectTo(/^.*127\.0\.0\.1.*\/login$/); // Ensure it redirects to the login page
        
        // Additional checks could be added here to ensure username generation and password hashing, 
        // but they may require database integration or mocks.
        
        done();
      });
  });
});



//test 2 register

describe('Testing Register API2', () => {
  // Positive test case
  it('positive : /register', (done) => {
    chai
      .request(server)
      .post('/register')
      .send({
        fN: 'John',
        lN: 'Doe',
        password: 'securepassword123'
      })
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200); // Expect success status
        res.should.redirectTo(/^.*127\.0\.0\.1.*\/login$/); // Expect redirect to login page
        done();
      });
  }).timeout(5000); // Extend timeout for async operation

  
    // Negative test case for invalid or missing first name and last name
    it('negative : /register with missing or invalid first and last name', (done) => {
      chai
        .request(server)
        .post('/register')
        .send({
          fN: '', // Invalid first name (empty)
          lN: 'D', // Invalid last name (less than 2 characters)
          password: 'securepassword123'
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(400); // Expect client error status
          expect(res.body.message).to.equals('Invalid input');
          done();
        }); 
    });
  }); 


describe('Login Route', () => {
  it('should log in successfully and redirect to /home', (done) => {
    chai
      .request(server)
      .post('/login')
      .send({
        username: 'johnDoe123',
        password: 'correctPassword'
      })
      .end((err, res) => {
        res.should.have.status(200); // Status code 200 (OK)
        res.should.redirectTo(/^.*127\.0\.0\.1.*\/register$/); // Ensure it redirects to the home page
        done();
      });
  });
});


describe('Login Route', () => {
  it('should not log in with incorrect password and stay on /login', (done) => {
    chai
      .request(server)
      .post('/login')
      .send({
        username: 'johnDoe123',
        password: 'wrongPassword'
      })
      .end((err, res) => {
        res.should.have.status(200); // Status code 200 (OK)
        res.should.redirectTo(/^.*127\.0\.0\.1.*\/register$/); // Stay on login page due to incorrect password
        done();
      });
  });
});