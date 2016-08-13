var plywood = require('plywood');
var ply = plywood.ply;
var $ = plywood.$;

module.exports = {
  find: function (req, res) {
    var roleId = parseInt(req.info.roleId);// extract from reques
    var datasourceId = parseInt(req.body.dataSourceId);
    var granularityId = parseInt(req.body.granularityId);
    var metricId = parseInt(req.body.metricId);
    var splitBy = parseInt(req.body.splitBy);
    var startTime = new Date(TimeService.strtotime(req.body.startTime)*1000);
    var endTime = new Date(TimeService.strtotime(req.body.endTime)*1000);
    if (!startTime || !endTime) {
      res.status(405);
      return res.send();
    }

    // check if user has the permission to access a certain datasource
    RoleDatasource.findOne({role: roleId, datasource: datasourceId}).exec(function (error, roleDatasource) {
      if (roleDatasource) {
        console.log('User can access datasource');
        // find relevant data source
        var query = Datasource.findOne({id: datasourceId})
          .populate("granularities", {id: granularityId})
          .populate("metrics", {id: metricId});

        if (splitBy)
          query.populate("filters", {id: splitBy});

        query.exec(function(err, datasource) {

            console.log(err, datasource);
            // check if allowed metric and granularity
            if (
              datasource.metrics.length > 0 &&
              datasource.granularities.length > 0 &&
              (!splitBy || (splitBy && datasource.filters.length > 0))
            ) {
              console.log("Preparing the query");
              // prepare the query
              var dataset = datasource.name;
              var granularity = Granularity.constants[datasource.granularities[0].name];
              var metric = Metric.constants[datasource.metrics[0].name];

              var context = {};
              context[dataset] = DruidService.createDataset(dataset);

              console.log(startTime);
              console.log(endTime);
              var ex = $(dataset)
                    .filter($("time").in(
                      {
                        start: startTime,
                        end: endTime
                      }))
                    .split($('time').timeBucket(granularity.interval, "Europe/London"), 'interval');

              if (splitBy) {
                ex = ex.apply('split', $(dataset).split($(datasource.filters[0].name), datasource.filters[0].title).apply('metric', '$'+dataset+'.'+metric.metricFn+'()'));
              } else {
                ex = ex.apply('metric', '$'+dataset+'.'+metric.metricFn+'()');
              }


              // send the query to druid
              ex.compute(context).then(function(data) {
                var dataToJS = JSON.parse(JSON.stringify(data.toJS()));
                res.type('application/json');
                res.status(200);
                res.send(JSON.stringify(dataToJS));
              }).done();

            } else {
              res.status(404);
              res.send('Some parameters did not match');
            }
          });
      }
      else if (error) {
        res.negotiate(error);
        return res.send();
      }
      else {
        res.status(403);
        return res.send();
      }
    });
  }
}
