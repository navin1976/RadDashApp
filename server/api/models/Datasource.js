/**
 * Created by BlackLinden on 26/07/2016.
 */
/**
 * Created by BlackLinden on 26/07/2016.
 */
module.exports = {
  connection: 'radiology_dashboard',
  attributes: {
    //e.g., 1
    datasourceId: {
      type: 'integer',
      autoIncrement: true,
      unique: true,
      primaryKey: true
      //columnName: 'datasource_id'
    },

    // e.g., "Exams"
    datasourceTitle: {
      type: 'string',
      size: 50
      //columnName: 'datasource_title'
    }
  }
}
