var plywood = require('plywood');
var ply = plywood.ply;
var $ = plywood.$;

module.exports = {
  /*
  Get timeseries data for datasource
   */
  find: function (req, res) {
    var roleId = parseInt(req.info.roleId);
    var datasourceId = parseInt(req.body.dataSourceId);
    var granularityId = parseInt(req.body.granularityId);
    var metricId = parseInt(req.body.metricId);
    var splitBy = parseInt(req.body.splitBy);
    var filters = req.body.filters;
    var startTime = new Date(TimeService.strtotime(req.body.startTime)*1000);
    var endTime = new Date(TimeService.strtotime(req.body.endTime)*1000);

    if (startTime.getTime()>endTime.getTime()) {
      res.status(405);
      return res.send();
    }

    if (!_.isArray(filters) || isNaN(datasourceId) || isNaN(granularityId) || isNaN(metricId)) {
      res.status(400);
      return res.send();
    }

    // check if user has the permission to access a certain datasource
    RoleDatasource.findOne({role: roleId, datasource: datasourceId}).exec(function (error, roleDatasource) {
      if (roleDatasource) {
        console.log('User can access datasource');
        // find relevant data source
        Datasource.findOne({id: datasourceId})
          .populate("granularities", {id: granularityId})
          .populate("metrics", {id: metricId})
          .populate("filters")
          .exec(function(err, datasource) {

            // checking if the split by is allowed

            var splitByCheck = splitBy ? false: true;
            var splitByName = "";
            for (var i = 0; i < datasource.filters.length; i++) {
              if (datasource.filters[i].id == splitBy) {
                splitByCheck = true;
                splitByName = datasource.filters[i].name;
              }
            }

            // check if allowed metric and granularity and split by
            if (
              datasource.metrics.length > 0 &&
              datasource.granularities.length > 0 &&
              splitByCheck
            ) {
              console.log("Preparing the query");
              // prepare the query
              var dataset = datasource.name;
              var granularity = Granularity.constants[datasource.granularities[0].name];
              var metric = Metric.constants[datasource.metrics[0].name];

              var context = {};
              context[dataset] = DruidService.createDataset(dataset);

              // filter the time
              var ex = $(dataset)
                .filter($("time").in(
                  {
                    start: startTime,
                    end: endTime
                  }))
              // filter the rest and execute
              FilterService.applyFilters($, ex, datasource, filters, function(failed, ex) {
                if (failed) {
                  res.status(403);
                  return res.send('Wrong parameters');
                }

                // bucket by granularity
                ex = ex.split($('time').timeBucket(granularity.interval, "Europe/London"), 'date');

                // split by if necessary
                if (splitBy) {
                  ex = ex.apply('split', $(dataset).split($(splitByName), 'split').apply('metric', '$'+dataset+'.'+metric.metricFn+'()'));
                } else {
                  ex = ex.apply('metric', '$'+dataset+'.'+metric.metricFn+'()');
                }

                // send the query to druid
                ex.compute(context).then(function(data) {
                  // parse the dates in a format that is requested by the front end
                  var dataToJS = JSON.parse(JSON.stringify(data.toJS()));
                  dataToJS.map(function(e) {
                    e.date = e.date.start + '/' + e.date.end;
                    return e
                  })
                  res.type('application/json');
                  res.status(200);
                  res.send(JSON.stringify(dataToJS));
                }).done();
              });
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
