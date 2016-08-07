/**
 * Created by BlackLinden on 07/08/2016.
 */
module.exports = function canCreateDefaultDashboard (req, res, next) {
  var userId = 1;
  var permissionId = RolePermission.constants.CAN_CREATE_DEFAULT_DASHBOARD;
  PermissionChecker.hasUserPermission(userId, permissionId, res, next);
};
