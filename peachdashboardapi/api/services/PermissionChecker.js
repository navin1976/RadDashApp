/**
 * Created by BlackLinden on 07/08/2016.
 */
module.exports = {
  hasUserPermission: function (userId, permissionId, res, next) {
    // find the user details
    User.findOne(userId).exec(function (error, user) {
      if (error) {
        res.negotiate(error);
        return res.send();
      }
      if (user) {
        var roleId = user.role;
        // try to get a mapping between the role and permission requested
        RolePermission.find({role: roleId, permission: permissionId}).exec(function(error, rolepermissions){
          if (error) {
            res.negotiate(error);
            return res.send();
          }
          // if there was a mapping, success
          if (rolepermissions.length > 0) {
           next();
          }
          else {
            // otherwise the user does not have permission
            res.status(403);
            res.send('Unauthorized');
          }
        });
      }
      else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }
}
