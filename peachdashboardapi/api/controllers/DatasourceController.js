/**
 * Created by BlackLinden on 20/07/2016.
 */
module.exports = {
  find: function (req, res) {
    var roleId = req.query.roleId;
    Role.find({id: roleId}).populate('datasources').exec(function(error, roles) {
        if (error) {
          res.negotiate(error);
          res.send();
        }
        if (roles.length > 0) {
          console.log(roles);
          datasourceIds = [];
          for (var i=0; i < roles[0].datasources.length; i++) {
            datasourceIds.push(roles[0].datasources[i].id);
          }
          Datasource.find({id: datasourceIds})
            .populate('granularities')
            .populate('filters')
            .populate('metrics')
            .exec(function(error, datasources) {
              if (error) {
                res.negotiate(error);
                res.send();
              }
              res.status(200);
              res.type('application/json');
              res.send(JSON.stringify(datasources));
            });
        } else {
          res.status(404);
          res.send();
        }
      });
  }
};
