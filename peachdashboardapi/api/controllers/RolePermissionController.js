/**
 * Created by BlackLinden on 20/07/2016.
 */
/**
 * Created by BlackLinden on 20/07/2016.
 */
module.exports = {
  assignRole: function (req, res) {
    var idUpdate = req.query.userId;
    var roleId = req.query.roleId;
    User.update({id: idUpdate}, {role: roleId}).exec(function(error, records){
      if (error) {
        // handle error here- e.g. `res.serverError(err);`
        return res.negotiate(error);
      }
      res.status(205);
      res.type('application/json');
      return res.send();
    });
  },

  findRole: function (req, res) {
    Role.find({}).populate('permissions').populate('datasources').exec(function(error, roles) {
      var rolesParsed = roles.map(function(role){
        return {
          datasourceIds: role.datasources.map(function(datasource){return datasource.id;}),
          description: role.description,
          id: role.id,
          permissionIds: role.permissions.map(function(permission){return permission.id;})
        };
      });
      res.status(200);
      res.type('application/json');
      return res.send(JSON.stringify(rolesParsed, null, 2));
    });
  },

  findPermission: function (req, res) {
    Permission.find({}).exec(function(error, records) {
      res.status(200);
      res.type('application/json');
      return res.send(JSON.stringify(records, null, 2));
    });
  },

  assignPermission: function (req, res) {
    var idUpdate = parseInt(req.body.roleId);
    var permissionIds = req.body.permissionIds;
    RolePermission.destroy({role:idUpdate})
      .then(function() { return Role.findOne(idUpdate);})
      .catch(function(error) { res.negotiate(error); res.send();})
      .then(function(role) { return Role.update(idUpdate, {permissions:permissionIds, description:role.description});})
      .catch(function(error) { res.negotiate(error); res.send();})
      .then(function() { res.status(205); res.send();})
      .catch(function(error) { res.negotiate(error); res.send();});

  }
};
