/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

  '*':'sessionAuth',

  RolePermissionController: {
    findRole: ['sessionAuth', 'canGetRoles'],
    assignRole: ['sessionAuth', 'canAssignRoles'],
    findPermission: ['sessionAuth', 'canGetPermissions'],
    assignPermission: ['sessionAuth', 'canAssignPermissions'],
    createRole: ['sessionAuth', 'canCreateRoles'],
    deleteRole: ['sessionAuth', 'canDeleteRoles']
  },

  UserController: {
    find: ['sessionAuth', 'canAssignRoles']
  },

  DashboardController: {
    'createDefault': ['sessionAuth', 'canCreateDefaultDashboard'],
    'updateDefault': ['sessionAuth', 'canUpdateDefaultDashboard'],
    'deleteDefault': ['sessionAuth', 'canDeleteDefaultDashboard'],
    'findDefault': ['sessionAuth', 'canGetDefaultDashboard']
  },

  DatasourceController: {
    'findAll': ['sessionAuth', 'canGetDatasources'],
    'assign': ['sessionAuth', 'canAssignDatasources']
  }
  /***************************************************************************
  *                                                                          *
  * Here's an example of mapping some policies to run before a controller    *
  * and its actions                                                          *
  *                                                                          *
  ***************************************************************************/
};
