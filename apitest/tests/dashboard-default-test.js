'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});
var request = require('request');

var testHelper = require('../testHelper.js');
testHelper.prepareForTest(ZSchema, validator);

chai.should();

var newDashboardId = null;

describe('/dashboard/default and /dashboard/default/{dashboardId}', function() {
  describe('post', function() {
    it('should respond with 201 The default dashboard is created and assigned', function(done) {

      /*eslint-disable*/
      var schema = {
        "$ref": "REFERENCE#/definitions/Dashboard"
      };

      request({
        url: 'http://localhost:1338/dashboard/default',
        qs: {
          roleId: testHelper.constants.ROLE_ROLE_SWITCHER
        },
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': testHelper.constants.USER_ADMIN
        },
        json: true,
        body: {
          "configuration": "string",
          "isEnabled": false,
          "title": "string"
        }
      },
      function(error, res, body) {
        if (error) return done(error);
        newDashboardId = body.id;
        res.statusCode.should.equal(201);
        validator.validate(body, schema).should.be.true;
        done();
      });
    });

    it('should respond with 403 User is not authorised to create a new dashboard', function(done) {
      /*eslint-enable*/
      request({
          url: 'http://localhost:1338/dashboard/default',
          qs: {
            roleId: testHelper.constants.ROLE_ROLE_SWITCHER
          },
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
      function(error, res, body) {
        if (error) return done(error);
        res.statusCode.should.equal(403);
        done();
      });
    });

  });
  describe('put', function() {
    it('should respond with 205 Default Dashboard is successfully updated', function (done) {
      request({
          url: 'http://localhost:1338/dashboard/default/' + newDashboardId,
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': testHelper.constants.USER_ADMIN
          },
          json: true,
          body: {
            "configuration": "string2",
            "isEnabled": false,
            "title": "string"
          }

        },
        function (error, res, body) {
          if (error) return done(error);

          res.statusCode.should.equal(205);
          (body === undefined).should.be.true
          done();
        });
    });
    it('should respond with 403 Default Dashboard need special permission to update', function (done) {
      request({
          url: 'http://localhost:1338/dashboard/default/' + newDashboardId,
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
        function (error, res, body) {
          if (error) return done(error);
          res.statusCode.should.equal(403);
          done();
        });
    });
  });
  describe('delete', function() {

    it('should respond with 403 if the user does not have permission', function (done) {
      request({
          url: 'http://localhost:1338/dashboard/default/' + newDashboardId,
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': testHelper.constants.USER_MEMBER
          },
          json: true
        },
        function (error, res, body) {
          if (error) return done(error);
          res.statusCode.should.equal(403);
          done();
        });
    });

    it('should respond with 205 Dashboard is successfully deleted', function(done) {
      request({
          url: 'http://localhost:1338/dashboard/default/'+newDashboardId,
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': testHelper.constants.USER_ADMIN
          },
          json: true
        },
        function(error, res, body) {
          if (error) return done(error);
          res.statusCode.should.equal(205);
          done();
        });
    });

    it('should respond with 403 if the default dashboard does not exist', function(done) {
      request({
          url: 'http://localhost:1338/dashboard/default/'+newDashboardId,
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': testHelper.constants.USER_ADMIN
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
