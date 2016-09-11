function checkErrors(error, res) {
  if (error) {
    res.negotiate(error);
    return res.send();
  }
  res.status(403);
  res.send('Unexpected Error');
}


module.exports = {
  /*
  Assign a role to a given user
   */
  assignRole: function (req, res) {
    var idUpdate = parseInt(req.query.userId);
    var roleId = parseInt(req.query.roleId);
    if (isNaN(idUpdate) || isNaN(roleId)){
      res.status(400);
      return res.send();
    }
    User.update({id: idUpdate}, {role: roleId}).exec(function (error, records) {
      if (error) {
        res.negotiate(error);
        return res.send();
      }
      res.status(205);
      res.type('application/json');
      return res.send();
    });
  },

  /*
  Get all the roles along side the permissions and datasource ids
   */
  findRole: function (req, res) {
    Role.find({}).populate('permissions').populate('datasources').exec(function (error, roles) {
      if (error) {
        res.negotiate(error);
        return res.send();
      }
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

  /*
  Get all the permissions
   */
  findPermission: function (req, res) {
    Permission.find({}).exec(function (error, records) {
      if (error) {
        res.negotiate(error);
        return res.send();
      }
      res.status(200);
      res.type('application/json');
      return res.send(JSON.stringify(records, null, 2));
    });
  },

  /*
  Assign permissions to a role
   */
  assignPermission: function (req, res) {
    var idUpdate = parseInt(req.body.roleId);
    var permissionIds = req.body.permissionIds.map(function(e){return parseInt(e);});

    if (isNaN(idUpdate) || _.indexOf(permissionIds, NaN)!=-1) {
      res.status(400);
      return res.send();
    }


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

  /*
  Create a new role
   */
  createRole: function (req, res) {
    var description = req.body.description;

    if (!(_.isString(description))) {
      res.status(400);
      return res.send();
    }

    Role.create({description: description}).exec(function (error, role) {
      if (error) {
        res.negotiate(error);
        return res.send();
      }
      res.status(201);
      res.type('application/json');
      return res.send(JSON.stringify(role));
    });
  },

  /*
  Delete a role and replace user with that role with a different one
   */
  deleteRole: function (req, res) {
    var roleId = parseInt(req.params.id);
    var replaceRoleId = parseInt(req.query.replaceRoleId);

    if (isNaN(roleId) || isNaN(replaceRoleId)){
      res.status(400);
      return res.send();
    }


    if (roleId == replaceRoleId) {
      res.status(400);
      return res.send('User cannot replace a role with itself');
    }

    // make sure that the new replace role exists
    Role.findOne({id: replaceRoleId}).exec(function (error, roleReplace) {
      if (roleReplace) {
        // make sure that the role to be replaced exists
        Role.findOne({id: roleId}).exec(function (error, roleDelete) {
          if (roleDelete) {
            // update users with the new role
            User.update({role: roleId}, {role: replaceRoleId}).exec(function (error, users) {
              // delete the old role
              Role.destroy({id: roleId}).exec(function (error) {
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
