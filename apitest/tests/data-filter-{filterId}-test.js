'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});
var request = require('request');

var testHelper = require('../testHelper.js');
testHelper.prepareForTest(ZSchema, validator);

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
        url: 'http://localhost:1338/data/filter/'+testHelper.constants.FILTER_DS_DIM1,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': testHelper.constants.USER_ADMIN
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

    it('should respond with 403 if you do not have access to the datasource', function(done) {
      request({
          url: 'http://localhost:1338/data/filter/'+testHelper.constants.FILTER_DS_FORBIDDEN_DIM1,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': testHelper.constants.USER_ADMIN
          }
        },
        function(error, res, body) {
          if (error) return done(error);
          res.statusCode.should.equal(403);
          done();
        });
    });

    it('should respond with 403 if the filter does not exist', function(done) {
      request({
          url: 'http://localhost:1338/data/filter/'+100,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': testHelper.constants.USER_ADMIN
          }
        },
        function(error, res, body) {
          if (error) return done(error);
          res.statusCode.should.equal(403);
          done();
        });
    });

    it('should respond with 403 if you can not get distinct values for the filter', function(done) {
      request({
          url: 'http://localhost:1338/data/filter/'+testHelper.constants.FILTER_DS_DIM2,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': testHelper.constants.USER_ADMIN
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
