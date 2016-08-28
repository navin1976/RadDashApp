'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});
var request = require('request');

var testHelper = require('../testHelper.js');
testHelper.prepareForTest(ZSchema, validator);

chai.should();

describe('/roles', function() {
  describe('get', function() {
    it('should respond with 200 and return the list of roles ', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "array",
        "items": {
          "$ref": "REFERENCE#/definitions/Role"
        }
      };

      /*eslint-enable*/
      request({
        url: 'http://localhost:1338/roles',
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

    it('should respond with 403, if the user is not authorised ', function(done) {
      /*eslint-enable*/
      request({
        url: 'http://localhost:1338/roles',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : testHelper.constants.USER_MEMBER
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        res.statusCode.should.equal(403);

        done();
      });
    });
  });

  var roleCreated = null;
  describe('post', function() {
    it('should respond with 201 and return the role created ', function (done) {
      /*eslint-disable*/
      var schema = {
        "$ref": "REFERENCE#/definitions/RoleCreated"
      };

      /*eslint-enable*/
      request({
          url: 'http://localhost:1338/roles',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': testHelper.constants.USER_ADMIN
          },
          json: true,
          body: {
            description: "newRoleCreated"
          }

        },
        function (error, res, body) {
          if (error) return done(error);

          roleCreated = body.id;
          res.statusCode.should.equal(201);
          validator.validate(body, schema).should.be.true;
          done();
        });
    });

    it('should respond with 403 when not allowed ', function (done) {
      /*eslint-disable*/
      var schema = {
        "$ref": "REFERENCE#/definitions/RoleCreated"
      };

      /*eslint-enable*/
      request({
          url: 'http://localhost:1338/roles',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': testHelper.constants.USER_MEMBER
          },
          json: true,
          body: {
            description: "newRoleCreated"
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

    it('should respond with 403 when not allowed', function (done) {
      /*eslint-enable*/
      request({
          url: 'http://localhost:1338/roles/'+roleCreated,
          method: 'DELETE',
          qs: {
            replaceRoleId: testHelper.constants.ROLE_MANAGER
          },
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

    it('should respond with 400 when replace is the same as original', function (done) {
      /*eslint-enable*/
      request({
          url: 'http://localhost:1338/roles/'+roleCreated,
          method: 'DELETE',
          qs: {
            replaceRoleId: roleCreated
          },
          headers: {
            'Content-Type': 'application/json',
            'Authorization': testHelper.constants.USER_ADMIN
          },
          json: true
        },
        function (error, res, body) {
          if (error) return done(error);

          res.statusCode.should.equal(400);

          done();
        });
    });

    it('should respond with 403 when replace does not exist', function (done) {
      /*eslint-enable*/
      request({
          url: 'http://localhost:1338/roles/'+roleCreated,
          method: 'DELETE',
          qs: {
            replaceRoleId: 999999
          },
          headers: {
            'Content-Type': 'application/json',
            'Authorization': testHelper.constants.USER_ADMIN
          },
          json: true
        },
        function (error, res, body) {
          if (error) return done(error);

          res.statusCode.should.equal(403);

          done();
        });
    });

    it('should respond with 403 when original does not exist', function (done) {
      /*eslint-enable*/
      request({
          url: 'http://localhost:1338/roles/'+99999,
          method: 'DELETE',
          qs: {
            replaceRoleId: roleCreated
          },
          headers: {
            'Content-Type': 'application/json',
            'Authorization': testHelper.constants.USER_ADMIN
          },
          json: true
        },
        function (error, res, body) {
          if (error) return done(error);

          res.statusCode.should.equal(403);

          done();
        });
    });

    it('should respond with 205 when role successfully deleted ', function (done) {
      /*eslint-enable*/
      request({
          url: 'http://localhost:1338/roles/'+roleCreated,
          method: 'DELETE',
          qs: {
            replaceRoleId: testHelper.constants.ROLE_MANAGER
          },
          headers: {
            'Content-Type': 'application/json',
            'Authorization': testHelper.constants.USER_ADMIN
          },
          json: true
        },
        function (error, res, body) {
          if (error) return done(error);

          res.statusCode.should.equal(205);

          done();
        });
    });


  });
});
