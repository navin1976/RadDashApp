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

    // e.g., "Exams"
    name: {
      type: 'string',
      size: 50,
      columnName: 'name'
    },

    roles:{
      collection: 'role',
      via: 'datasources',
      through: 'roledatasource'
    },

    granularities:{
      collection: 'granularity',
      via: 'datasources',
      through: 'granularitydatasource'
    },

    filters:{
      collection: 'filter',
      via: 'datasource',
    },

    metrics:{
      collection: 'metric',
      via: 'datasources',
      through: 'metricdatasource'
    }

  }
}
