
/**
 * Created by BlackLinden on 26/07/2016.
 */
module.exports = {
  connection: 'radiology_dashboard',
  attributes: {
    //e.g., 1
    permissionId: {
      type: 'integer',
      autoIncrement: true,
      unique: true,
      primaryKey: true
      //columnName: 'permission_id'
    },

    //Can view radiologist data
    permissionDescription: {
      type: 'string',
      size: 50
      //columnName: 'permission_description'
    }
  }
}
