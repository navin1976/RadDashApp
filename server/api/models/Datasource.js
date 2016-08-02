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
      via: 'datasource',
      through: 'roledatasource'
    },

    granularities:{
      collection: 'granularity',
      via: 'datasource',
      through: 'granularitydatasource'
    },

    filters:{
      collection: 'filter',
      via: 'datasource',
      through: 'filterdatasource'
    },

    metrics:{
      collection: 'metric',
      via: 'datasource',
      through: 'metricdatasource'
    }

  }
}
