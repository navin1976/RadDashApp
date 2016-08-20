'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});
var request = require('request');

var testHelper = require('../testHelper.js');
testHelper.prepareForTest(ZSchema, validator);

chai.should();

describe('/dashboard/default', function() {
  describe('post', function() {
    it('should respond with 201 The default dashboard is...', function(done) {
      request({
        url: 'http://localhost:1338/dashboard/default',
        qs: {
          roleId: 'DATA GOES HERE'
        },
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        json: {
          body: 'DATA GOES HERE'
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        res.statusCode.should.equal(201);

        body.should.equal(null); // non-json response or no schema
        done();
      });
    });

    it('should respond with 403 User is not authorised to...', function(done) {
      /*eslint-disable*/
      var schema = {
        "$ref": "REFERENCE#/definitions/Error"
      };

      /*eslint-enable*/
      request({
        url: 'http://localhost:1338/dashboard/default',
        qs: {
          roleId: 'DATA GOES HERE'
        },
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        json: {
          body: 'DATA GOES HERE'
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        res.statusCode.should.equal(403);

        validator.validate(JSON.parse(body), schema).should.be.true;
        done();
      });
    });

  });

});
