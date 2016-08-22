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

    // e.g., "Scanner17"
    canGetDistinct: {
      type: 'boolean',
      columnName: 'can_get_distinct'
    },

    filterType: {
      type: 'string',
      size: 50,
      columnName: 'filter_type'
    },

    // e.g., "Scanner17"
    name: {
      type: 'string',
      size: 50,
      columnName: 'name'
    },

    title: {
      type: 'string',
      size: 50,
      columnName: 'title'
    },

    datasource:{
      columnName: 'datasource_id',
      model: 'datasource'
    }
  }
}
