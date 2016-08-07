/**
 * Created by BlackLinden on 07/08/2016.
 */
module.exports = function canGetPermissions (req, res, next) {
  var userId = 1;
  var permissionId = RolePermission.constants.CAN_GET_PERMISSIONS;
  PermissionChecker.hasUserPermission(userId, permissionId, res, next);
};
