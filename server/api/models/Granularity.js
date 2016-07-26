/**
 * Created by BlackLinden on 26/07/2016.
 */
module.exports = {
  connection: 'radiology_dashboard',
  attributes: {
    // e.g., "Daily"
    granularityName: {
      type: 'string',
      size: 50
      //columnName: 'granularity_name' - maybe smart enough to convert **
    },

    //e.g., 1
    granularityId: {
      type: 'integer',
      autoIncrement: true,
      unique: true,
      primaryKey: true
    }
  }
}
