'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});
var request = require('request');

var testHelper = require('../testHelper.js');
testHelper.prepareForTest(ZSchema, validator);

chai.should();

describe('/data/entities', function() {
  describe('post', function() {
    it('should respond with 200 when entities successfully retrieved', function(done) {
      /*eslint-enable*/
      request({
        url: 'http://localhost:1338/data/entities',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': testHelper.constants.USER_MEMBER
        },
        json: true,
        body: {
          "dataSourceId": testHelper.constants.DATASOURCE,
          "startTime": "2016-01-01 00:00:00",
          "filters": [],
          "endTime": "2016-01-15 00:00:00"
        }
      },
      function(error, res, entities) {
        if (error) return done(error);

        (entities.length > 60).should.be.true;
        ('dimension1' in entities[0]).should.be.true;
        ('dimension2' in entities[0]).should.be.true;
        ('time' in entities[0]).should.be.true;
        res.statusCode.should.equal(200);
        done();
      });
    });



    it('should respond 200 when we filter successfully', function(done) {
      request({
          url: 'http://localhost:1338/data/entities',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': testHelper.constants.USER_ADMIN
          },
          json: true,
          body: {
            "dataSourceId": testHelper.constants.DATASOURCE,
            "filters": [
              {
                "filterId": testHelper.constants.FILTER_DS_DIM1,
                "filterValues": [0]
              },
              {
                "filterId": testHelper.constants.FILTER_DS_DIM2,
                "filterValues": [0]
              }
            ],
            "startTime": "2016-01-01 00:00:00",
            "endTime": "2018-01-15 00:00:00"
          }
        },
        function(error, res, entities) {
          if (error) return done(error);
          entities.forEach(function(e) {
            e['dimension1'].should.equal('0');
            e['dimension2'].should.equal('0');
          });
          res.statusCode.should.equal(200);
          done();
        });

    });

    it('should respond 403 when we request a datasource we cannot access', function(done) {

      request({
          url: 'http://localhost:1338/data/entities',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': testHelper.constants.USER_MEMBER
          },
          json: true,
          body: {
            "dataSourceId": testHelper.constants.DATASOURCE_FORBIDDEN,
            "startTime": "2016-01-01 00:00:00",
            "filters": [],
            "endTime": "2018-01-15 00:00:00"
          }
        },
        function(error, res, entities) {
          if (error) return done(error);
          res.statusCode.should.equal(403);
          done();
        }
      );
    });

    it('should respond 403 when we filter using a filter that does not belong', function(done) {

      request({
          url: 'http://localhost:1338/data/entities',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': testHelper.constants.USER_ADMIN
          },
          json: true,
          body: {
            "dataSourceId": testHelper.constants.DATASOURCE,
            "filters": [
              {
                "filterId": testHelper.constants.FILTER_DS_FORBIDDEN_DIM1,
                "filterValues": [0]
              }
            ],
            "startTime": "2016-01-01 00:00:00",
            "endTime": "2018-01-15 00:00:00"
          }
        },
        function(error, res, entities) {
          if (error) return done(error);
          res.statusCode.should.equal(403);
          done();
        });
    });

    it('should respond with 405 when the start time of the query is greater than (later) the end time', function(done) {

      /*eslint-enable*/
      request({
          url: 'http://localhost:1338/data/entities',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': testHelper.constants.USER_MEMBER
          },
          json: true,
          body: {
            "dataSourceId": testHelper.constants.DATASOURCE,
            "filters": [],
            "startTime": "2017-01-01 00:00:00",
            "endTime": "2016-12-15 00:00:00"
          }
        },
        function(error, res, body) {
          if (error) return done(error);

          res.statusCode.should.equal(405);
          done();
        });
    });
  });
});
