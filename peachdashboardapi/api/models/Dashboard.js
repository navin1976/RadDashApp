/**
 * Created by BlackLinden on 29/07/2016.
 */
module.exports = {
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    //e.g., 1
    id: {
      type: 'integer',
      autoIncrement: true,
      unique: true,
      primaryKey: true,
      columnName: 'id'
    },

    // e.g., "Scanner performance"
    title: {
      type: 'string',
      columnName: 'title'
    },

    // e.g., "true" -> is  the dashboard displayed for the user?
    isEnabled: {
      type: 'boolean',
      size: 1,
      columnName: 'is_enabled'
    },

    // e.g., "Scanner performance"
    configuration: {
      type: 'string',
      size: 65000,
      columnName: 'configuration'
    },

    users: {
      collection: 'user',
      via: 'dashboards',
      through: 'userdashboard'
    },

    roles:{
      collection: 'role',
      via: 'dashboards',
      through: 'roledashboard'
    }
  }
}
