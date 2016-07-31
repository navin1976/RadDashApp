/**
 * Created by BlackLinden on 26/07/2016.
 */

module.exports = {
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

    datasources:{
      collection: 'datasource',
      via: 'role',
      through: 'roledatasource'
    },

    dashboards:{
      collection: 'dashboard',
      via: 'role',
      through: 'roledashboard'
    },

    permissions:{
      collection: 'permission',
      via: 'role',
      through: 'rolepermission'
    }
  }
}
