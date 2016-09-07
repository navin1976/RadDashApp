module.exports = function canGetDefaultDashboard (req, res, next) {
  var userId = req.info.userId;
  var permissionId = RolePermission.constants.CAN_GET_DEFAULT_DASHBOARD;
  PermissionChecker.hasUserPermission(userId, permissionId, res, next);
};