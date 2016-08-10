/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {view: 'homepage'},
  /**Dashboard Routes**/
  'GET /dashboards': {controller: 'DashboardController', action: 'find'},
  'POST /dashboards': {controller: 'DashboardController', action: 'create'},
  'PUT /dashboard/:id': {controller: 'DashboardController', action: 'update'},
  'DELETE /dashboard/:id': {controller: 'DashboardController', action: 'delete'},
  'POST /dashboards/default': {controller: 'DashboardController', action: 'createDefault'},
  'PUT /dashboards/default/:id': {controller: 'DashboardController', action: 'updateDefault'},
  'DELETE /dashboards/default/:id': {controller: 'DashboardController', action: 'deleteDefault'},

  /**Users Routes**/
  'GET /users': {controller: 'UserController', action: 'find'},
  'GET /users/loggedin': {controller: 'UserController', action: 'info'},

  /**RolePermission Routes**/
  'GET /roles': {controller: 'RolePermissionController', action: 'findRole'},
  'GET /permissions': {controller: 'RolePermissionController', action: 'findPermission'},
  'PUT /roles/assign': {controller: 'RolePermissionController', action: 'assignRole'},
  'PUT /permissions/assign': {controller: 'RolePermissionController', action: 'assignPermission'},

  /**Data Routes**/
  'GET /data/datasource': {controller: 'DatasourceController', action: 'findForCurrentUser'},
  'POST /data/entities': {controller: 'DataentitiesController', action: 'find'},
  'POST /data/timeseries': {controller: 'TimeseriesController', action: 'find'},

  /**Datasources**/
  'GET /datasources': {controller: 'DatasourceController', action: 'findAll'},
  'PUT /datasources/assign': {controller: 'DatasourceController', action: 'assign'}
  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
