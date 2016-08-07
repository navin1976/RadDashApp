/**
 * Created by BlackLinden on 07/08/2016.
 */
module.exports = function canAssignRoles (req, res, next) {
  var userId = 1;
  var permissionId = RolePermission.constants.CAN_ASSIGN_ROLES;
  PermissionChecker.hasUserPermission(userId, permissionId, res, next);
};
