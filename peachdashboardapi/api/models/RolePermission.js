/**
 * Created by BlackLinden on 30/07/2016.
 */
module.exports = {
  autoCreatedAt: false,
  autoUpdatedAt: false,
  constants: {
    CAN_CREATE_DEFAULT_DASHBOARD: 1,
    CAN_GET_ROLES: 2,
    CAN_GET_PERMISSIONS: 3,
    CAN_ASSIGN_ROLES: 4,
    CAN_ASSIGN_PERMISSION: 5
  },
  attributes: {
    role:{
      model:'role'
    },
    permission: {
      model: 'permission'
    }
  }
}
