/**
 * Created by BlackLinden on 18/07/2016.
 */
module.exports = {
  create: function (req, res) {
    var dashboardCreated = {
      "configuration": "{\r\n  \"subtitle\": \"Scanner dashboard\",\r\n  \"whatever\": \"Fields for dashboard config\",\r\n  \"widgets\": [\r\n  {\r\n    \"layout\": {\r\n      \"x\": 0,\r\n      \"y\": 0,\r\n      \"width\": 3,\r\n      \"height\": 3\r\n    },\r\n    \"name\": \"Exams per hour on Scanomat2000 for the past week\",\r\n    \"options\": {\r\n      \"canRefresh\": true,\r\n      \"canResize\": false,\r\n      \"canCreateSparkles\": true\r\n    },\r\n    \"type\": \"barChart\",\r\n    \"data\": {\r\n      \"dataSourceId\": 12,\r\n      \"filters\": [\r\n        {\r\n          \"filterId\": 1,\r\n          \"filterValue\": \"now - 1 week\"\r\n        },\r\n        {\r\n          \"filterId\": 5,\r\n          \"filterValue\": \"Scanomat2000\"\r\n        }\r\n      ],\r\n      \"metricId\":2,\r\n      \"granularityId\":1\r\n    }\r\n  }\r\n  ]\r\n}",
      "id": 1,
      "is_enabled": true,
      "title": "Performance Metrics Oncology"
    };
    res.type('application/json',null, 2);
    res.status(201);
    return res.send(JSON.stringify(dashboardCreated));
  },
  find: function (req, res) {
    Dashboard.find({}).exec(function(error, records) {
      res.status(200);
      res.type('application/json');
      return res.send(JSON.stringify(records, null, 2));
    });
  },
  update: function (req, res) {
    res.status(205);
    return res.send();
  },
  delete: function (req, res) {
    res.status(205);
    return res.send();
  },
  default: function (req, res) {
    console.log(req.body);
    console.log(req.query);
    configuration = req.body.configuration;
    title = req.body.title;
    isEnabled = req.body.isEnabled;
    roleId = req.query.roleId;
    console.log(configuration, title, isEnabled);
    Dashboard.create({configuration: configuration, title: title, isEnabled: isEnabled, roles:[roleId]}).exec(function(error, records){
      if (error) {
        // handle error here- e.g. `res.serverError(err);`
        res.status(404);
        return res.send();
      }
      res.status(205);
      res.type('application/json');
      return res.send()
    });
  }
}


