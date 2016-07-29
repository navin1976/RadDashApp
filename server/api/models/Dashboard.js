/**
 * Created by BlackLinden on 29/07/2016.
 */
module.exports = {
  connection: 'radiology_dashboard',
  attributes: {
    //e.g., 1
    dashboardId: {
      type: 'integer',
      autoIncrement: true,
      unique: true,
      primaryKey: true
      //columnName: 'dashboard_id'
    },

    // e.g., "Scanner performance"
    dashboardTitle: {
      type: 'string',
      size: 50
      //columnName: 'dashboard_title'
    },

    // e.g., "true" -> is  the dashboard displayed for the user?
    isEnabled: {
      type: 'boolean',
      size: 1
      //columnName: 'is_enabled'
    },

    // e.g., "Scanner performance"
    dashboardConfiguration: {
      type: 'string',
      size: 500
      //columnName: 'dashboard_configuration'
    }
  }
}
