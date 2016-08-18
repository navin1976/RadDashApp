'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});
var request = require('request');

chai.should();

describe('/dashboards', function() {
  describe('get', function() {
    it('should respond with 200 An array of dashboards', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "array",
        "items": {
          "$ref": "#/definitions/Dashboard"
        }
      };

      /*eslint-enable*/
      request({
        url: 'http://localhost:1338/dashboards',
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

    it('should respond with 404 The given user does not...', function(done) {
      /*eslint-disable*/
      var schema = {
        "$ref": "#/definitions/Error"
      };

      /*eslint-enable*/
      request({
        url: 'http://localhost:1338/dashboards',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        res.statusCode.should.equal(404);

        validator.validate(body, schema).should.be.true;
        done();
      });
    });

  });

  describe('post', function() {
    it('should respond with 201 Dashboard successfully...', function(done) {
      /*eslint-disable*/
      var schema = {
        "$ref": "#/definitions/Dashboard"
      };

      /*eslint-enable*/
      request({
        url: 'http://localhost:1338/dashboards',
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

        validator.validate(body, schema).should.be.true;
        done();
      });
    });

    it('should respond with 400 Error 400', function(done) {
      /*eslint-disable*/
      var schema = {
        "$ref": "#/definitions/Error"
      };

      /*eslint-enable*/
      request({
        url: 'http://localhost:1338/dashboards',
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

        res.statusCode.should.equal(400);

        validator.validate(body, schema).should.be.true;
        done();
      });
    });

  });

});
