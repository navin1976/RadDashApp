'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});
var request = require('request');

var testHelper = require('../testHelper.js');
testHelper.prepareForTest(ZSchema, validator);

chai.should();

describe('/roles/assign', function() {
  describe('put', function() {
    it('should respond with 205 The update was successful...', function(done) {
      request({
        url: 'http://localhost:1338/roles/assign',
        qs: {
          roleId: testHelper.constants.ROLE_MANAGER, userId: testHelper.constants.USER_SWITCHER
        },
        method: 'PUT',
        headers: {
          'Authorization': testHelper.constants.USER_ADMIN
        },
      },
      function(error, res, body) {
        if (error) return done(error);
        res.statusCode.should.equal(205);
        done();
      });
    });

    it('should respond with 403 The user is not authorised...', function(done) {
      request({
          url: 'http://localhost:1338/roles/assign',
          qs: {
            roleId: testHelper.constants.ROLE_MANAGER, userId: testHelper.constants.USER_SWITCHER
          },
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': testHelper.constants.USER_MEMBER
          },
        },
        function(error, res, body) {
          if (error) return done(error);
          res.statusCode.should.equal(403);
          done();
        });
    });

    it('should respond with 205 The update was successful...', function(done) {
      request({
          url: 'http://localhost:1338/roles/assign',
          qs: {
            roleId: testHelper.constants.ROLE_MEMBER, userId: testHelper.constants.USER_SWITCHER
          },
          method: 'PUT',
          headers: {
            'Authorization': testHelper.constants.USER_ADMIN
          },
        },
        function(error, res, body) {
          if (error) return done(error);
          res.statusCode.should.equal(205);
          done();
        });
    });

  });

});
