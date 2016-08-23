var plywood = require('plywood');
var ply = plywood.ply;
var $ = plywood.$;

module.exports = {
  find: function (req, res) {
    var roleId = parseInt(req.info.roleId);// extract from reques
    var datasourceId = parseInt(req.body.dataSourceId);
    var filters = req.body.filters;
    var startTime = new Date(TimeService.strtotime(req.body.startTime)*1000);
    var endTime = new Date(TimeService.strtotime(req.body.endTime)*1000);
    if (startTime.getTime()>endTime.getTime()) {
      res.status(405);
      return res.send();
    }

    // check if user has the permission to access a certain datasource
    Datasource.findOne(datasourceId).populate('roles', {id: roleId}).populate('filters').exec(function (error, datasource) {
      if (datasource && datasource.roles.length > 0) {
        console.log("Preparing the query");
        // prepare the query
        var dataset = datasource.name;
        var context = {};
        context[dataset] = DruidService.createDataset(dataset);
        // get all the dimensions
        var filterNames = datasource.filters.map(function(e) { return e.name; });


        // get the time
        filterNames.push('time');
        var ex = $(dataset)
              .filter($("time").in(
                {
                  start: startTime,
                  end: endTime
                }));

        FilterService.applyFilters($, ex, datasource, filters, function(failed, ex){
          if (failed) {
            res.status(403);
            return res.send('Wrong paramaeters');
          }

          // only select the dimensions
          ex = ex.select.apply(ex, filterNames);
          // send the query to druid
          ex.compute(context).then(function(data) {
            // send the response
            var dataToJS = data.toJS();
            dataToJS.map(function(e) {
              e.time = e.time.value;
              return e;
            });
            res.type('application/json');
            res.status(200);
            res.send(JSON.stringify(dataToJS));
          }).done();
        });

      } else if (error) {
        res.negotiate(error);
        return res.send();
      } else {
        res.status(403);
        return res.send();
      }
    });
  }
}
