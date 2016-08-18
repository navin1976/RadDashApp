'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});
var request = require('request');

chai.should();

describe('/data/filter/{filterId}', function() {
  describe('get', function() {
    it('should respond with 200 Success', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "array",
        "items": {
          "type": "string"
        }
      };

      /*eslint-enable*/
      request({
        url: 'http://localhost:1338/data/filter/{filterId PARAM GOES HERE}',
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
