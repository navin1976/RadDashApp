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
    User.update({id: idUpdate}, {role: roleId}).exec(function (error, records) {
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
    Role.find({}).populate('permissions').populate('datasources').exec(function (error, roles) {
      var rolesParsed = roles.map(function (role) {
        return {
          datasourceIds: role.datasources.map(function (datasource) {
            return datasource.id;
          }),
          description: role.description,
          id: role.id,
          permissionIds: role.permissions.map(function (permission) {
            return permission.id;
          })
        };
      });
      res.status(200);
      res.type('application/json');
      return res.send(JSON.stringify(rolesParsed, null, 2));
    });
  },

  findPermission: function (req, res) {
    Permission.find({}).exec(function (error, records) {
      res.status(200);
      res.type('application/json');
      return res.send(JSON.stringify(records, null, 2));
    });
  },

  assignPermission: function (req, res) {
    var idUpdate = parseInt(req.body.roleId);
    var permissionIds = req.body.permissionIds;
    RolePermission.destroy({role: idUpdate})
      .then(function () {
        return Role.findOne(idUpdate);
      })
      .catch(function (error) {
        res.negotiate(error);
        res.send();
      })
      .then(function (role) {
        return Role.update(idUpdate, {permissions: permissionIds, description: role.description});
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

  },

  createRole: function (req, res) {
    var description = req.body.description;
    console.log('description: ', description);
    Role.create({description: description}).exec(function (error, role) {
      if (error) {
        // handle error here- e.g. `res.serverError(err);`
        return res.negotiate(error);
      }
      res.status(201);
      res.type('application/json');
      return res.send(JSON.stringify(role));
    });
  },

  deleteRole: function (req, res) {
    var roleId = parseInt(req.params.id);
    var replaceRoleId = parseInt(req.query.replaceRoleId);
    console.log(roleId, replaceRoleId);
    if (roleId == replaceRoleId) {
      res.status(400);
      return res.send('User cannot replace a role with itself');
    }

    function checkErrors(error, res) {
      if (error) {
        res.negotiate(error);
        return res.send();
      }
      res.status(403);
      res.send('Unexpected Error');
    }

    Role.findOne({id: replaceRoleId}).exec(function (error, roleReplace) {
      console.log('Replace role id exist');
      if (roleReplace) {
        Role.findOne({id: roleId}).exec(function (error, roleDelete) {
          console.log('Role to delete exist');
          if (roleDelete) {
            User.update({role: roleId}, {role: replaceRoleId}).exec(function (error, users) {
              console.log('Users with old role updated');
              Role.destroy({id: roleId}).exec(function (error) {
                console.log('old role deleted');
                if (error) {
                  res.negotiate(error);
                  return res.send();
                }
                res.status(205);
                return res.send();
              });
            });
          } else {
            checkErrors(error, res);
          }
        });
      } else {
        checkErrors(error, res);
      }
    });
  }
}
