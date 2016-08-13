/**
 * Created by BlackLinden on 07/08/2016.
 */
module.exports = {
  hasUserPermission: function (userId, permissionId, res, next) {
    User.findOne(userId).exec(function (error, user) {
      if (error) {
        // handle error here- e.g. `res.serverError(err);`
        res.negotiate(error);
        return res.send();
      }
      if (user) {
        var roleId = user.role;
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
            res.send('Unauthorized');
          }
        });
      }
      else {
        res.status(401);
        res.send('Unauthorized');
      }
    });
  }
}
