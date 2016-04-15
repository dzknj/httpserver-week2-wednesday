const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const expect = chai.expect;
const request = chai.request;
const server = require('./../server');
require(__dirname + '/../server');

describe('testing my HTTP server', () => {
  before((done) => {
    server.listen(3000, () => {
      console.log('server listening on 3000');
      done();
    })
    .on('error', (err) => {
      console.log(err);
    });
  });
  after(() => {
    server.close(() => {
      console.log('closing server');
    });
  });
  it('should respond to GET request to /greet/(your name here) with super rad greeting', (done) => {
    request('localhost:3000')
    .get('/greet/jersey')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('<h4>What\'s Crackalackin!!?? </h4><h5>keepin\' it heavy, </h5><h3><i>jersey</i>?</h3><h2>grooooovy, man....</h2>')
      done();
    });
  });
  it('should log current date and time', (done) => {
    request('localhost:3000')
    .get('/time')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('<h5>The current date and time is: </h5>' + '<h4>' + new Date() + '</h4>' + '<h6>Brought to you by Jersey Dave</h6>');
      done();
    });
  });
  it('should return JSON post request data', (done) => {
    request('localhost:3000')
    .post('/greet')
    .send({"name":"jersey"})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('{"name":"jersey"}');
      done();
    });
  });
});
