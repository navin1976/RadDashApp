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
    var filters = req.body.filters;
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
        Datasource.findOne({id: datasourceId})
          .populate("granularities", {id: granularityId})
          .populate("metrics", {id: metricId})
          .populate("filters")
          .exec(function(err, datasource) {

            // checking if the split by is allowed
            splitByCheck = splitBy ? false: true;
            for (var i = 0; i < datasource.filters.length; i++) {
              if (datasource.filters[i].id == splitBy) {
                splitByCheck = true;
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

              // filter the time and bucket by granularity
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
                  return res.send('Wrong paramaeters');
                }

                ex = ex.split($('time').timeBucket(granularity.interval, "Europe/London"), 'interval');

                // split by if necessary
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
