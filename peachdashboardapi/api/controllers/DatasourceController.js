/**
 * Created by BlackLinden on 20/07/2016.
 */
module.exports = {
  /*
  Get the datasource available for the current user
   */
  findForCurrentUser: function (req, res) {
    //userId of the current user
    var userId = req.info.userId;

    //finding roleId of current user
    User.findOne({id: userId}).exec(function (error, user){
      if (error) {
        res.negotiate(error);
        res.send();
      }
      if (user) {
        var roleId = user.role;
        // find the datasource IDs associated with this role
        Role.findOne({id: roleId}).populate('datasources').exec(function(error, role){
          if (error) {
            res.negotiate(error);
            res.send();
          }
          if (role) {
            datasourceIds = [];
            for (var i = 0; i < role.datasources.length; i++){
             datasourceIds.push(role.datasources[i].id);
            }
            // find the datasource along side the granularities and filters and metrics associated
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

  /*
  Find all datasources
   */
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

  /*
  Assign datasources to a role
   */
  assign: function (req, res) {
    var idUpdate = parseInt(req.body.roleId);
    var datasourceIds = req.body.datasourceIds.map(function(e){return parseInt(e);});

    if (isNaN(idUpdate) || _.indexOf(datasourceIds, NaN)!=-1) {
      res.status(400);
      return res.send();
    }
    // Delete the mappings between this role and datasources
    RoleDatasource.destroy({role: idUpdate})
      .then(function () { return Role.findOne(idUpdate);})
      .then(function (role) {
        // Update the role to have new datasource associated with
        // the description here is because of a bug in waterline that does not allow updates
        // with only relationships
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
