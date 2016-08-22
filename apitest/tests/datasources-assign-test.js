'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});
var request = require('request');
var _ = require('lodash');

var testHelper = require('../testHelper.js');
testHelper.prepareForTest(ZSchema, validator);

chai.should();

describe('/datasources/assign', function() {
  describe('put', function() {
    it('should respond with 205 if the update was successful and it should be updated when GET /roles', function(done) {
      request({
          url: 'http://localhost:1338/datasources/assign',
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': testHelper.constants.USER_ADMIN
          },
          json: true,
          body: {
            "datasourceIds": [
              1,2
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
              var datasourceIds = roles[testHelper.constants.ROLE_ROLE_SWITCHER].datasourceIds;
              datasourceIds.length.should.equal(2);
              datasourceIds.should.include(1);
              datasourceIds.should.include(2);
              done();
            });

        });
    });

    it('should respond with 205 if the update was successful, even with an empty array', function(done) {
      request({
          url: 'http://localhost:1338/datasources/assign',
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': testHelper.constants.USER_ADMIN
          },
          json: true,
          body: {
            "datasourceIds": [],
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
          url: 'http://localhost:1338/datasources/assign',
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': testHelper.constants.USER_MEMBER
          },
          json: true,
          body: {
            "datasourceIds": [],
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
