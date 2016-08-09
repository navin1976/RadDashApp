/**
 * Created by BlackLinden on 07/08/2016.
 */
module.exports = function canAssignPermissions (req, res, next) {
  var userId = req.info.userId;
  var permissionId = RolePermission.constants.CAN_ASSIGN_PERMISSION;
  PermissionChecker.hasUserPermission(userId, permissionId, res, next);
};
