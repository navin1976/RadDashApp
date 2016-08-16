'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});
var request = require('request');

chai.should();

describe('/datasources', function() {
  describe('get', function() {
    it('should respond with 200 List of all datasources...', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "array",
        "items": {
          "$ref": "#/definitions/Datasource"
        }
      };

      /*eslint-enable*/
      request({
        url: 'http://localhost:1337/datasources',
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
