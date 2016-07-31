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

    // e.g., "Daily"
    name: {
      type: 'string',
      size: 50,
      columnName: 'name'
    },

    datasources:{
      collection: 'datasource',
      via: 'granularity',
      through: 'granularitydatasource'
    }
  }
}
