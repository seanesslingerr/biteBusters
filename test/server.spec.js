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