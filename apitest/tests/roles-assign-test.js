'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});
var request = require('request');

chai.should();

describe('/roles/assign', function() {
  describe('put', function() {
    it('should respond with 205 The update was successful...', function(done) {
      request({
        url: 'http://localhost:1338/roles/assign',
        qs: {
          roleId: 'DATA GOES HERE',userId: 'DATA GOES HERE'
        },
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        json: {
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        res.statusCode.should.equal(205);

        body.should.equal(null); // non-json response or no schema
        done();
      });
    });

    it('should respond with 403 The user is not authorised...', function(done) {
      /*eslint-disable*/
      var schema = {
        "$ref": "#/definitions/Error"
      };

      /*eslint-enable*/
      request({
        url: 'http://localhost:1338/roles/assign',
        qs: {
          roleId: 'DATA GOES HERE',userId: 'DATA GOES HERE'
        },
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        json: {
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        res.statusCode.should.equal(403);

        validator.validate(body, schema).should.be.true;
        done();
      });
    });

  });

});
