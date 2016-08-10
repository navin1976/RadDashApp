/**
 * Created by BlackLinden on 08/08/2016.
 */
module.exports = function canAssignDatasources (req, res, next) {
  var userId = req.info.userId;
  var permissionId = RolePermission.constants.CAN_ASSIGN_DATASOURCES;
  PermissionChecker.hasUserPermission(userId, permissionId, res, next);
};
