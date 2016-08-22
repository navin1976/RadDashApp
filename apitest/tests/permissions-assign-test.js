'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});
var request = require('request');
var _ = require('lodash');

var testHelper = require('../testHelper.js');
testHelper.prepareForTest(ZSchema, validator);

chai.should();

describe('/permissions/assign', function() {
  describe('put', function() {
    it('should respond with 205 if the update was successful and it should be updated when GET /roles', function(done) {
      request({
          url: 'http://localhost:1338/permissions/assign',
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': testHelper.constants.USER_ADMIN
          },
          json: true,
          body: {
            "permissionIds": [
              1,2,3
            ],
            "roleId": testHelper.constants.ROLE_ROLE_SWITCHER
          }
        },
        function(error, res, body) {
          if (error) return done(error);
          res.statusCode.should.equal(205);

          // checking that the permission have actually been assigned
          request({
              url: 'http://localhost:1338/roles',
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': testHelper.constants.USER_ADMIN
              },
              json: true,
            },
            function(error, res, roles) {
              res.statusCode.should.equal(200);
              if (error) return done(error);
              roles = _.keyBy(roles, 'id');
              var permissionIds = roles[testHelper.constants.ROLE_ROLE_SWITCHER].permissionIds;
              permissionIds.length.should.equal(3);
              permissionIds.should.include(1);
              permissionIds.should.include(2);
              permissionIds.should.include(3);
              done();
            });

        });
    });

    it('should respond with 205 if the update was successful, even with an empty array', function(done) {
      request({
          url: 'http://localhost:1338/permissions/assign',
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': testHelper.constants.USER_ADMIN
          },
          json: true,
          body: {
            "permissionIds": [],
            "roleId": testHelper.constants.ROLE_ROLE_SWITCHER
          }
        },
        function(error, res, body) {
          if (error) return done(error);
          res.statusCode.should.equal(205);
          done();
        });
    });

    it('should respond with 403 The user is not authorised...', function(done) {

      /*eslint-enable*/
      request({
        url: 'http://localhost:1338/permissions/assign',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': testHelper.constants.USER_MEMBER
        },
        json: true,
        body: {
          "permissionIds": [],
          "roleId": testHelper.constants.ROLE_ROLE_SWITCHER
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
