'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});
var request = require('request');

var testHelper = require('../testHelper.js');
testHelper.prepareForTest(ZSchema, validator);

chai.should();

describe('/data/timeseries', function() {
  describe('post', function() {
    it('should respond with 200 when call successful (without splitBy)', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "array",
        "items": {
          "$ref": "REFERENCE#/definitions/MetricData"
        }
      };

      /*eslint-enable*/
      request({
        url: 'http://localhost:1338/data/timeseries',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': testHelper.constants.USER_MEMBER
        },
        json: true,
        body: {
          "dataSourceId": testHelper.constants.DATASOURCE,
          "startTime": "2016-01-01 00:00:00",
          "endTime": "2016-12-15 00:00:00",
          "metricId": testHelper.constants.METRIC_COUNT,
          "granularityId": testHelper.constants.GRANULARITY_MONTHLY
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        res.statusCode.should.equal(200);

        validator.validate(body, schema).should.be.true;
        done();
      });
    });

    it('should respond with 200 when call successful (with splitBy)', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "array",
        "items": {
          "$ref": "REFERENCE#/definitions/MetricData"
        }
      };

      /*eslint-enable*/
      request({
          url: 'http://localhost:1338/data/timeseries',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': testHelper.constants.USER_MEMBER
          },
          json: true,
          body: {
            "dataSourceId": testHelper.constants.DATASOURCE,
            "startTime": "2016-01-01 00:00:00",
            "endTime": "2016-12-15 00:00:00",
            "metricId": testHelper.constants.METRIC_COUNT,
            "granularityId": testHelper.constants.GRANULARITY_MONTHLY,
            "splitBy": testHelper.constants.FILTER_DS_DIM1
          }
        },
        function(error, res, body) {
          if (error) return done(error);

          res.statusCode.should.equal(200);

          validator.validate(body, schema).should.be.true;
          done();
        });
    });

    it('should respond with 404 when granularity is not associated with the datasource', function(done) {
      request({
          url: 'http://localhost:1338/data/timeseries',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': testHelper.constants.USER_MEMBER
          },
          json: true,
          body: {
            "dataSourceId": testHelper.constants.DATASOURCE,
            "startTime": "2016-01-01 00:00:00",
            "endTime": "2016-12-15 00:00:00",
            "metricId": testHelper.constants.METRIC_COUNT,
            "granularityId": 99,
            "splitBy": testHelper.constants.FILTER_DS_DIM1
          }
        },
        function (error, res, body) {
          if (error) return done(error);
          res.statusCode.should.equal(404);
          done();
        });
    });

    it('should respond with 404 when metric is not associated with the datasource', function(done) {
      request({
          url: 'http://localhost:1338/data/timeseries',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': testHelper.constants.USER_MEMBER
          },
          json: true,
          body: {
            "dataSourceId": testHelper.constants.DATASOURCE,
            "startTime": "2016-01-01 00:00:00",
            "endTime": "2016-12-15 00:00:00",
            "metricId": 99,
            "granularityId": testHelper.constants.GRANULARITY_MONTHLY,
            "splitBy": testHelper.constants.FILTER_DS_DIM1
          }
        },
        function (error, res, body) {
          if (error) return done(error);

          res.statusCode.should.equal(404);
          done();
        });
    });

    it('should respond with 404 when splitBy is not associated with the datasource', function(done) {
      request({
          url: 'http://localhost:1338/data/timeseries',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': testHelper.constants.USER_MEMBER
          },
          json: true,
          body: {
            "dataSourceId": testHelper.constants.DATASOURCE,
            "startTime": "2016-01-01 00:00:00",
            "endTime": "2016-12-15 00:00:00",
            "metricId": testHelper.constants.METRIC_COUNT,
            "granularityId": testHelper.constants.GRANULARITY_MONTHLY,
            "splitBy": testHelper.constants.FILTER_DS_FORBIDDEN_DIM1
          }
        },
        function (error, res, body) {
          if (error) return done(error);

          res.statusCode.should.equal(404);
          done();
        });
    });

    it('should respond with 403 when user cannot access the datasource', function(done) {
      request({
          url: 'http://localhost:1338/data/timeseries',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': testHelper.constants.USER_MEMBER
          },
          json: true,
          body: {
            "dataSourceId": testHelper.constants.DATASOURCE_FORBIDDEN,
            "startTime": "2016-01-01 00:00:00",
            "endTime": "2016-12-15 00:00:00",
            "metricId": testHelper.constants.METRIC_COUNT,
            "granularityId": testHelper.constants.GRANULARITY_MONTHLY,
            "splitBy": testHelper.constants.FILTER_DS_DIM1
          }
        },
        function (error, res, body) {
          if (error) return done(error);

          res.statusCode.should.equal(403);
          done();
        });
    });

    it('should respond with 403 when the filter is not found', function(done) {
      request({
          url: 'http://localhost:1338/data/timeseries',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': testHelper.constants.USER_MEMBER
          },
          json: true,
          body: {
            "dataSourceId": testHelper.constants.DATASOURCE,
            "startTime": "2016-01-01 00:00:00",
            "filters": [
              {
                "filterId": testHelper.constants.FILTER_DS_FORBIDDEN_DIM1,
                "filterValues": [
                  "string"
                ]
              }
            ],
            "endTime": "2016-12-15 00:00:00",
            "metricId": testHelper.constants.METRIC_COUNT,
            "granularityId": testHelper.constants.GRANULARITY_MONTHLY,
            "splitBy": testHelper.constants.FILTER_DS_DIM1
          }
        },
        function (error, res, body) {
          if (error) return done(error);

          res.statusCode.should.equal(403);
          done();
        });
    });

    it('should respond with 405 when the start time of the query is greater than (later) the end time', function(done) {

      /*eslint-enable*/
      request({
          url: 'http://localhost:1338/data/timeseries',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': testHelper.constants.USER_MEMBER
          },
          json: true,
          body: {
            "dataSourceId": testHelper.constants.DATASOURCE,
            "startTime": "2017-01-01 00:00:00",
            "endTime": "2016-12-15 00:00:00",
            "metricId": testHelper.constants.METRIC_COUNT,
            "granularityId": testHelper.constants.GRANULARITY_MONTHLY,
            "splitBy": testHelper.constants.FILTER_DS_DIM1
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
