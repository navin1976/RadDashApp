/**
 * Created by BlackLinden on 26/07/2016.
 */

module.exports = {
  connection: 'radiology_dashboard',
  attributes: {
    //e.g., 1
    roleId: {
      type: 'integer',
      autoIncrement: true,
      unique: true,
      primaryKey: true
      //columnName: 'role_id'
    },

    //Radiologist
    roleDescription: {
      type: 'string',
      size: 50
      //columnName: 'role_description'
    }
  }
}
