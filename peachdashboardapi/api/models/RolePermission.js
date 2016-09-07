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
    CAN_ASSIGN_PERMISSION: 6,
    CAN_GET_DATASOURCES: 7,
    CAN_ASSIGN_DATASOURCES: 8,
    CAN_CREATE_ROLES: 9,
    CAN_DELETE_ROLES: 10,
    CAN_GET_DEFAULT_DASHBOARD: 11,
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
