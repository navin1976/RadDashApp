/**
 * Created by BlackLinden on 26/07/2016.
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

    //Dr Smith
    name: {
      type: 'string',
      size: 50,
      columnName: 'name'
    },

    //2
    roleId: {
      columnName: 'role_id',
      model: 'role'
    },

    hashpass: {
      type: 'string',
      size: 50,
      columnName: 'hashpass'
    },

    dashboards: {
      collection: 'dashboard',
      via: 'user',
      through: 'userdashboard'
    }
  }
}
