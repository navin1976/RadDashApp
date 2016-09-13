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
    },
    min: {
      metricFn: 'min',
      name: 'min'
    },
    max: {
      metricFn: 'max',
      name: 'max'
    },
    average: {
      metricFn: 'average',
      name: 'average'
    },
    countDistinct: {
      metricFn: 'countDistinct',
      name: 'countDistinct'
    },
    sum: {
      metricFn: 'sum',
      name: 'sum'
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
