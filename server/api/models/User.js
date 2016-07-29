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
      //columnName: 'user_id'
    },

    //Dr Smith
    roleDescription: {
      type: 'string',
      size: 50
      //columnName: 'user_title'
    },

    //2
    role_id: {
      type: 'string',
      size: 50
      //columnName: 'user_title'
    },

    hashpass: {
      type: 'string',
      size: 50
      //columnName: 'hashpass'
    }
  }
}
