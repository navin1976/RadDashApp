/**
 * Created by BlackLinden on 26/07/2016.
 */
module.exports = {
  autoCreatedAt: false,
  autoUpdatedAt: false,
  constants: {
    count: {
      metricFn: 'count',
      name: 'count'
    }
  },
  attributes: {
    //e.g., 1
    id: {
      type: 'integer',
      autoIncrement: true,
      unique: true,
      primaryKey: true,
      columnName: 'id'
    },

    // e.g., "count"
    name: {
      type: 'string',
      size: 50,
      columnName: 'name'
    },

    datasources:{
      collection: 'datasource',
      via: 'metrics',
      through: 'metricdatasource'
    }
  }
}
