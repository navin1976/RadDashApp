/**
 * Created by BlackLinden on 07/08/2016.
 */
module.exports = function canGetPermissions (req, res, next) {
  var userId = req.info.userId;
  var permissionId = RolePermission.constants.CAN_GET_PERMISSIONS;
  PermissionChecker.hasUserPermission(userId, permissionId, res, next);
};
