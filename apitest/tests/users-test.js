'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});
var request = require('request');

var testHelper = require('../testHelper.js');
testHelper.prepareForTest(ZSchema, validator);

chai.should();

describe('/users', function() {
  describe('get', function() {
    it('should respond with 200 and return the list of all users', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "array",
        "items": {
          "$ref": "REFERENCE#/definitions/User"
        }
      };

      /*eslint-enable*/
      request({
        url: 'http://localhost:1338/users',
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

    it('should respond with 403, if the user is not authorised to get the list of all users ', function(done) {
      /*eslint-enable*/
      request({
        url: 'http://localhost:1338/users',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : testHelper.constants.USER_RADIOGRAPHER
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        res.statusCode.should.equal(403);

        done();
      });
    });

  });

});
