var plywood = require('plywood');
var ply = plywood.ply;
var $ = plywood.$;

module.exports = {
  find: function (req, res) {
    var roleId = parseInt(req.info.roleId);// extract from reques
    var datasourceId = parseInt(req.body.dataSourceId);
    var granularityId = parseInt(req.body.granularityId);
    var metricId = parseInt(req.body.metricId);

    // check if user has the permission to access a certain datasource
    RoleDatasource.findOne({role: roleId, datasource: datasourceId}).exec(function (error, roleDatasource) {
      if (roleDatasource) {
        console.log('User can access datasource');
        // find relevant data source
        Datasource.findOne({id: datasourceId})
          .populate("granularities", {id: granularityId})
          .populate("metrics", {id: metricId})
          .exec(function(err, datasource) {

            console.log(err, datasource);
            // check if allowed metric and granularity
            if (datasource.metrics.length > 0 && datasource.granularities.length > 0) {
              console.log("Preparing the query");
              // prepare the query
              var dataset = datasource.name;
              var granularity = Granularity.constants[datasource.granularities[0].name];
              var metric = Metric.constants[datasource.metrics[0].name];

              var context = {};
              context[dataset] = DruidService.createDataset(dataset);

              var ex = ply()
                .apply(dataset,
                  $(dataset)
                    .filter($("time").in(
                      {
                        start: new Date("2010-09-12T00:00:00Z"),
                        end: new Date("2015-09-13T00:00:00Z")
                      }))
                    .split($('time').timeBucket(granularity.interval, "Europe/London"), 'interval')
                    .apply('metric', '$'+dataset+'.'+metric.metricFn+'()'));

              // send the query to druid
              ex.compute(context).then(function(data) {
                // send the response

                var dataResponse = [];
                var dataToJS = JSON.parse(JSON.stringify(data.toJS()[0][dataset]));
                for (var i = 0; i < dataToJS.length; i++) {
                  dataResponse.push({
                    metric: dataToJS[i].metric,
                    date: dataToJS[i].interval.start+"/"+dataToJS[i].interval.end
                  });
                }
                res.type('application/json');
                res.status(200);
                res.send(JSON.stringify(dataResponse));
              }).done();

            } else {
              res.status(404);
              res.send()
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