'use strict';
var chai = require('chai');
var request = require('request');

chai.should();

describe('/dashboard/{dashboardId}', function() {
  describe('put', function() {
    it('should respond with 205 Dashboard is successfully...', function(done) {
      request({
        url: 'http://localhost:1337/dashboard/{dashboardId PARAM GOES HERE}',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        json: {
          body: 'DATA GOES HERE'
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        res.statusCode.should.equal(205);

        body.should.equal(null); // non-json response or no schema
        done();
      });
    });

  });

  describe('delete', function() {
    it('should respond with 205 Dashboard is successfully...', function(done) {
      request({
        url: 'http://localhost:1337/dashboard/{dashboardId PARAM GOES HERE}',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        res.statusCode.should.equal(205);

        body.should.equal(null); // non-json response or no schema
        done();
      });
    });

  });

});
