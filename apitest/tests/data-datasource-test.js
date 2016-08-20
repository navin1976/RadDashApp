'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});
var request = require('request');

var testHelper = require('../testHelper.js');
testHelper.prepareForTest(ZSchema, validator);

chai.should();

describe('/data/datasource', function() {
  describe('get', function() {
    it('should respond with 200 Data sources successfully...', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "array",
        "items": {
          "$ref": "REFERENCE#/definitions/Datasource"
        }
      };

      /*eslint-enable*/
      request({
        url: 'http://localhost:1338/data/datasource',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': testHelper.constants.USER_MEMBER
        },
        json: true
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
