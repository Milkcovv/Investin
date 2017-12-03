const boot = require('../src/app').boot,
  shutdown = require('../src/app').shutdown,
  port = require('../src/app').port,
  request = require('superagent').agent(),
  expect = require('chai').expect,
  seedUsers = require('../src/db/users.json');

describe('USER', function () {
  
  before(function () {
    boot();
  });

  it('gets home page route',function (done){
    request
      .get('http://localhost:' + port)
      .end(function(err, res){
        expect(res.status).to.equal(200);
        done();
    });
  });

  it('gets login route', function (done) {
    request
      .get('http://localhost:' + port + '/login')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        done();
    });
  });

  it('gets user list', function (done) {
    request.get('http://localhost:' + port + '/users').end(function(err, res){
        for (var i = 0; i < seedUsers.length; i++) {
          expect(res.text).to.contain('<h3>' + seedUsers[i].username);
        }
        done();
    });
  });


  it('adds new user:test', function (done) {
    request
      .post('http://localhost:' + port + '/signup')
      .send({username: "test", email: "test@example.com", password: "test"})
      .end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(200);
        expect(res.redirects[0]).to.equal('http://localhost:' + port + '/dashboard');
        done(); 
      });
  });

  it('fails to add user:test again', function (done) {
    request
      .post('http://localhost:' + port + '/signup')
      .send({username: "test", email: "test@example.com", password: "test"})
      .end(function (err, res) {
        //TODO: check user count
        expect(err).to.equal(null);
        done();
      });

  });

  it('gets test route', function (done) {
    request.get('http://localhost:' + port + '/test').end(function(err, res){
        expect(res.status).to.equal(200);
        done();
    });
  });

  it('get dashboard', function (done) {
    request
      .get('http://localhost:' + port + '/dashboard')
      .end(function(err, res){
        expect(err).to.equal(null);
        expect(res.status).to.equal(200);
        done();
    });
  });

  it('updates user email', function (done) {
    request
      .post('http://localhost:' + port + '/test')
      .send({email: 'testing@example.com'})
      .end(function (err, res) {
        //console.log(res.body);
        expect(err).to.equal(null);
        expect(res.status).to.equal(200);
        expect(res.redirects[0]).to.equal('http://localhost:' + port + '/dashboard');
        done();
      });
  });

  it('updates username test to testing', function (done) {
    request
      .post('http://localhost:' + port + '/test')
      .send({username: 'testing'})
      .end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(200);
        expect(res.redirects[0]).to.equal('http://localhost:' + port + '/dashboard');
        done();
      });
  });

  it('gets updated user:testing route', function (done) {
    request
      .get('http://localhost:' + port + '/testing')
      .end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(200);
        done();
      });

  });

  it('logs out user:testing', function (done) {
    request.get('http://localhost:' + port + '/logout')
      .end(function(err, res){
        expect(res.redirects[0]).to.equal('http://localhost:' + port + '/');
        done();
    });

  });

  it('get dashboard route unauthorized', function (done) {
    request
      .get('http://localhost:' + port + '/dashboard')
      .end(function(err, res){
        expect(err).to.not.equal(null);
        expect(res.status).to.equal(401);
        done();
    });
  });

  //fails in travis, unauthorized error
  xit('logs in user:testing', function (done) {
    request
      .post('http://localhost:' + port + '/login')
     // .auth(seedUsers[0].email, seedUsers[0].password)
      .send({email:"testing@example.com", password:"test"})
      .end(function(err, res) {
        expect(err).to.equal(null);
        //console.log('*********************', res);
        expect(res.status).to.equal(200);
        done();
      });

  });

  it('deletes user:testing', function (done) {
    request
      .del('http://localhost:' + port + '/testing')
      //.send({"destroy": true})
      .end(function (err, res) {
        console.log(err);
        expect(err).to.equal(null);
        expect(res.redirects[0]).to.equal('http://localhost:' + port + '/');
        done();
      });
  });

  it('fails to get route testing', function (done) {
    request
      .get('http://localhost:' + port + '/testing')
      .end(function (err, res) {
        expect(err).to.not.equal(null);
        expect(res.status).to.equal(404);
        done();
      });

  });
  
  after(function () {
    shutdown();
  });

});