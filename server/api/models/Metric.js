/**
 * Created by BlackLinden on 26/07/2016.
 */
module.exports = {
  connection: 'radiology_dashboard',
  attributes: {
    //e.g., 1
    metricId: {
      type: 'integer',
      autoIncrement: true,
      unique: true,
      primaryKey: true
    },

    // e.g., "count"
    metricName: {
      type: 'string',
      size: 50
      //columnName: 'metric_name'
    }
  }
}
