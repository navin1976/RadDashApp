/**
 * Created by BlackLinden on 07/08/2016.
 */
module.exports = {
  hasUserPermission: function (userId, permissionId, res, next) {
    User.find({id: userId}).exec(function (error, users) {
      if (error) {
        // handle error here- e.g. `res.serverError(err);`
        res.negotiate(error);
        return res.send();
      }
      if (users.length > 0) {
        var roleId = users[0].roleId;
        RolePermission.find({role: roleId, permission: permissionId}).exec(function(error, rolepermissions){
          if (error) {
            // handle error here- e.g. `res.serverError(err);`
            res.negotiate(error);
            return res.send();
          }
          if (rolepermissions.length > 0) {
           next();
          }
          else {
            res.status(401);
            res.send();
          }
        });
      }
      else {
        res.status(401);
        res.send();
      }
    });
  }
}
