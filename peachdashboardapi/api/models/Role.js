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

    //Radiologist
    description: {
      type: 'string',
      size: 50,
      columnName: 'description'
    },

    users: {
      collection: 'user',
      via: 'roleId'
    },

    permissions:{
      collection: 'permission',
      via: 'roles',
      through: 'rolepermission'
    },

    datasources:{
      collection: 'datasource',
      via: 'roles',
      through: 'roledatasource'
    },

    dashboards:{
      collection: 'dashboard',
      via: 'roles',
      through: 'roledashboard'
    }
  }
}
