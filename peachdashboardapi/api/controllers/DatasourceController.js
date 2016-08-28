/**
 * Created by BlackLinden on 20/07/2016.
 */
module.exports = {
  findForCurrentUser: function (req, res) {
    //userId of the current user
    var userId = req.info.userId;

    //finding roleId of current user
    User.find({id: userId}).exec(function (error, users){
      if (error) {
        res.negotiate(error);
        res.send();
      }
      if (users.length > 0) {
        var roleId = users[0].role;
        Role.find({id: roleId}).populate('datasources').exec(function(error, roles){
          if (error) {
            res.negotiate(error);
            res.send();
          }
          if (roles.length > 0) {
            datasourceIds = [];
            for (var i = 0; i < roles[0].datasources.length; i++){
             datasourceIds.push(roles[0].datasources[i].id);
            }
            Datasource.find({id: datasourceIds})
              .populate('granularities')
              .populate('filters')
              .populate('metrics')
              .exec(function(error, datasources){
                if (error) {
                  res.negotiate(error);
                  res.send();
                }
                res.status(200);
                res.type('application/json');
                res.send(JSON.stringify(datasources));
              });
          }
          else {
            res.status(404);
            res.send();
          }
        });
      }
      else {
        res.status(404);
        res.send();
      }
    });

  },

  findAll: function (req, res) {
    Datasource.find({})
      .populate('granularities')
      .populate('filters')
      .populate('metrics')
      .exec(function (error, datasources) {
        if (error) {
          res.negotiate(error);
          res.send();
        }
        res.status(200);
        res.type('application/json');
        res.send(JSON.stringify(datasources));
      });
  },

  assign: function (req, res) {
    var idUpdate = parseInt(req.body.roleId);
    var datasourceIds = req.body.datasourceIds.map(function(e){return parseInt(e);});

    if (isNaN(idUpdate) || _.indexOf(datasourceIds, NaN)!=-1) {
      res.status(400);
      return res.send();
    }
    RoleDatasource.destroy({role: idUpdate})
      .then(function () { return Role.findOne(idUpdate);})
      .then(function (role) {
        if (role)
          return Role.update(idUpdate, {datasources: datasourceIds, description:role.description});
      })
      .catch(function (error) {
        res.negotiate(error);
        res.send();
      })
      .then(function () {
        res.status(205);
        res.send();
      })
      .catch(function (error) {
        res.negotiate(error);
        res.send();
      });
  }
};
