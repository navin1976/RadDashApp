/**
 * Created by BlackLinden on 26/07/2016.
 */
module.exports = {
  connection: 'radiology_dashboard',
  attributes: {
    //e.g., 1
    granularityId: {
      type: 'integer',
      autoIncrement: true,
      unique: true,
      primaryKey: true
      //columnName: 'granularity_id'
    },

    // e.g., "Daily"
    granularityName: {
      type: 'string',
      size: 50
      //columnName: 'granularity_name'
    }
  }
}
