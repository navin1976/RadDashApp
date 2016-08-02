
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

    //Can view radiologist data
    description: {
      type: 'string',
      size: 50,
      columnName: 'description'
    },

    roles:{
      collection: 'role',
      via: 'permission',
      through: 'rolepermission'
    }
  }
}
