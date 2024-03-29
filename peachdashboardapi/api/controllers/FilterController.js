var plywood = require('plywood');
var ply = plywood.ply;
var $ = plywood.$;

module.exports = {
  /*
  Find distinct value of a given filter
   */
  find: function (req, res) {
    var filterId = parseInt(req.params.id);// extract from request
    var roleId = req.info.roleId;

    if (isNaN(filterId)) {
      res.status(400);
      return res.send();
    }

    // check if user has the permission to access a certain datasource
    Filter.findOne(filterId).exec(function (error, filter) {
      if (error) {
        res.negotiate(error);
        return res.send();
      }
      if (!filter) {
        res.status(403);
        return res.send('Filter does not exist');
      }
      if (!filter.canGetDistinct) {
        res.status(403);
        return res.send('Cannot get distinct values for this filter');
      }
      // Make sure that the user requesting the distinct value of a filter has access to
      // the datasource associated with that filter
      RoleDatasource.findOne({datasource:filter.datasource, role:roleId}).populate('datasource').exec(function(error, roledatasource) {
        // you are allowed
        if (roledatasource) {
          var dataset = roledatasource.datasource.name;

          var context = {};
          context[dataset] = DruidService.createDataset(dataset);

          // request the distinct value to druid by requesting a count
          // on all the distinct value of a given dimension
          var ex = $(dataset)
                .split($(filter.name), 'filter')
                .limit(1000)
                .apply('metric', '$'+dataset+'.count()');

          // send the query to druid
          ex.compute(context).then(function(data) {
            var distinctValues = data.toJS().map(function(e) { return e.filter; });
            res.type('application/json');
            res.status(200);
            res.send(JSON.stringify(distinctValues));
          }).done();

        } else if (error) {
          res.negotiate(error);
          return res.send();
        } else {
          res.status(403);
          return res.send("User does not have access to datasource " + filter.datasource);
        }
      });
    });
  }
}
