/**
 * Created by BlackLinden on 28/08/2016.
 */
module.exports = function canDeleteRoles (req, res, next) {
  var userId = req.info.userId;
  var permissionId = RolePermission.constants.CAN_DELETE_ROLES;
  PermissionChecker.hasUserPermission(userId, permissionId, res, next);
};