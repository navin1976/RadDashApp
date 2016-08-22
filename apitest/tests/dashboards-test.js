'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});
var request = require('request');

var testHelper = require('../testHelper.js');
testHelper.prepareForTest(ZSchema, validator);

chai.should();


var newDashboardId = null;

describe('/dashboards and /dashboard/{dashboardId}', function() {
  describe('get', function() {
    it('should respond with 200 An array of dashboards', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "array",
        "items": {
          "$ref": "REFERENCE#/definitions/Dashboard"
        }
      };

      /*eslint-enable*/
      request({
        url: 'http://localhost:1338/dashboards',
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

  describe('post', function() {
    it('should respond with 201 Dashboard successfully...', function (done) {
      /*eslint-disable*/
      var schema = {
        "$ref": "REFERENCE#/definitions/Dashboard"
      };

      /*eslint-enable*/
      request({
          url: 'http://localhost:1338/dashboards',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': testHelper.constants.USER_MEMBER
          },
          json: true,
          body: {
            "configuration": "string",
            "isEnabled": false,
            "title": "string"
          }
        },
        function (error, res, body) {
          if (error) return done(error);
          res.statusCode.should.equal(201);
          newDashboardId = body.id;
          validator.validate(body, schema).should.be.true;
          done();
        });
    });
  });

  describe('put', function() {
    it('should respond with 205 Dashboard is successfully updated', function(done) {
      request({
          url: 'http://localhost:1338/dashboard/'+newDashboardId,
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': testHelper.constants.USER_MEMBER
          },
          json: true,
          body: {
            "configuration": "string2",
            "isEnabled": false,
            "title": "string"
          }

        },
        function(error, res, body) {
          if (error) return done(error);

          res.statusCode.should.equal(205);
          (body === undefined).should.be.true
          done();
        });
    });

    it('should respond with 403 if the operation cannot be completed', function(done) {
      request({
          url: 'http://localhost:1338/dashboard/'+(newDashboardId+1),
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': testHelper.constants.USER_MEMBER
          },
          json: true,
          body: {
            "configuration": "string2",
            "isEnabled": false,
            "title": "string"
          }

        },
        function(error, res, body) {
          if (error) return done(error);
          res.statusCode.should.equal(403);
          done();
        });
    });
  });

  describe('delete', function() {

    it('should respond with 403 if the dashboard does not belong to the user', function(done) {
      request({
          url: 'http://localhost:1338/dashboard/'+newDashboardId,
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': testHelper.constants.USER_MANAGER
          },
          json: true
        },
        function(error, res, body) {
          if (error) return done(error);
          res.statusCode.should.equal(403);
          done();
        });
    });

    it('should respond with 205 Dashboard is successfully deleted', function(done) {
      request({
          url: 'http://localhost:1338/dashboard/'+newDashboardId,
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': testHelper.constants.USER_MEMBER
          },
          json: true
        },
        function(error, res, body) {
          if (error) return done(error);
          res.statusCode.should.equal(205);

          (body === undefined).should.be.true
          done();
        });
    });

    it('should respond with 403 if the dashboard does not exist', function(done) {
      request({
          url: 'http://localhost:1338/dashboard/'+newDashboardId,
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': testHelper.constants.USER_MEMBER
          },
          json: true
        },
        function(error, res, body) {
          if (error) return done(error);
          res.statusCode.should.equal(403);
          done();
        });
    });
  });

});
