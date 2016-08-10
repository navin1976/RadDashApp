/**
 * Created by BlackLinden on 08/08/2016.
 */
module.exports = function canGetDatasources (req, res, next) {
  var userId = req.info.userId;
  var permissionId = RolePermission.constants.CAN_GET_DATASOURCES;
  PermissionChecker.hasUserPermission(userId, permissionId, res, next);
};
