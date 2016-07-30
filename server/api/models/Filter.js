/**
 * Created by BlackLinden on 26/07/2016.
 */
module.exports = {
  connection: 'radiology_dashboard',
  attributes: {
    //e.g., 1
    filterId: {
      type: 'integer',
      autoIncrement: true,
      unique: true,
      primaryKey: true
      //columnName: 'filter_id'
    },

  // e.g., "Scanner17"
  filterName: {
    type: 'string',
    size: 50
    //columnName: 'filter_name'
  }
  }
}
