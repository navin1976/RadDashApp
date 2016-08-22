'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});
var request = require('request');

var testHelper = require('../testHelper.js');
testHelper.prepareForTest(ZSchema, validator);

chai.should();

describe('/users/loggedin', function() {
  describe('get', function() {
    it('should respond with 200 Info of logged in user...', function(done) {
      /*eslint-disable*/
      var schema = {
        "$ref": "REFERENCE#/definitions/User"
      };

      /*eslint-enable*/
      request({
        url: 'http://localhost:1338/users/loggedin',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': testHelper.constants.USER_ADMIN
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        res.statusCode.should.equal(200);

        validator.validate(JSON.parse(body), schema).should.be.true;
        done();
      });
    });

  });

});
