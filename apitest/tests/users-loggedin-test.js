'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});
var request = require('request');

chai.should();

describe('/users/loggedin', function() {
  describe('get', function() {
    it('should respond with 200 Info of logged in user...', function(done) {
      /*eslint-disable*/
      var schema = {
        "$ref": "#/definitions/User"
      };

      /*eslint-enable*/
      request({
        url: 'http://localhost:1337/users/loggedin',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        res.statusCode.should.equal(200);

        validator.validate(body, schema).should.be.true;
        done();
      });
    });

  });

});
