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

// Example Positive Testcase :
// API: /add_user
// Input: {id: 5, name: 'John Doe', dob: '2020-02-20'}
// Expect: res.status == 200 and res.body.message == 'Success'
// Result: This test case should pass and return a status 200 along with a "Success" message.
// Explanation: The testcase will call the /add_user API with the following input
// and expects the API to return a status of 200 along with the "Success" message.

describe('Testing Add User', () => {
  it('positive : /add_user', done => {
    chai
      .request(server)
      .post('/add_user')
      .send({username: 'John Doe', password: '1234'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals('Success');
        done();
      });
  });
});

describe('Testing Add User API', () => {
  it('positive : /add_user', done => {
    // Refer above for the positive testcase implementation
  });

  // Example Negative Testcase :
  // API: /add_user
  // Input: {id: 5, name: 10, dob: '2020-02-20'}
  // Expect: res.status == 400 and res.body.message == 'Invalid input'
  // Result: This test case should pass and return a status 400 along with a "Invalid input" message.
  // Explanation: The testcase will call the /add_user API with the following invalid inputs
  // and expects the API to return a status of 400 along with the "Invalid input" message.
  it('Negative : /add_user. Checking invalid name', done => {
    chai
      .request(server)
      .post('/add_user')
      .send({username: 10, password: "1234"})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equals('Invalid input');
        done();
      });
  });

// ********************************************************************************


//test 1 register
describe('Testing Register API1', () => {
  it('positive : /register', done => {
    chai
      .request(server)
      .post('/register')
      .send({
        username: 'johndoe',
        email: 'johndoe@example.com',
        password: 'securepassword123'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        // expect(res.body.message).to.equals('User registered successfully');
        // res.should.redirectTo(/login$/);
        done();
      });
  });
});
 


//test 2 register

describe('Testing Register API2', () => {
  // Positive test case
  it('positive : /register', done => {
    // Refer to the positive test case above.
  });

  it('negative : /register with invalid email', done => {
    chai
      .request(server)
      .post('/register')
      .send({
        username: 'johndoe',
        email: 'invalid-email', // invalid email format
        password: 'securepassword123'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        //expect(res.body.message).to.equals('Invalid input');
        done();
      });
  });

});