var plywood = require('plywood');
var ply = plywood.ply;
var $ = plywood.$;

var granularities = {
  monthly : {
    name: 'month',
    interval: 'P1M'
  },
  daily : {
    name: 'day',
    interval: 'P1D'
  },
  yearly : {
    name: 'year',
    interval: 'P1Y'
  }
};

var metrics = {
  count: {
    metricFn: 'count',
    name: 'count'
  }
};

module.exports = {
  find: function (req, res) {

    // extract from request
    var datasourceId = req.body.dataSourceId;
    var granularityId = req.body.granularityId;
    var metricId = req.body.metricId;

    // find relevant data source
    Datasource.findOne({id: datasourceId})
      .populate("granularities", {id: granularityId})
      .populate("metrics", {id: metricId})
      .exec(function(err, datasource) {


      // check if allowed metric and granularity
      if (datasource.metrics.length > 0 && datasource.granularities.length > 0) {

        // prepare the query
        var dataset = datasource.name;
        var granularity = granularities[datasource.granularities[0].name];
        var metric = metrics[datasource.metrics[0].name];


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
          res.type('application/json');
          res.status(200);
          res.send(JSON.stringify(data.toJS()[0][dataset], null, 2));
        }).done();

      } else {
        res.status(404);
        // return res.negotiate(error);
        res.send()
      }
    });
  }
}
