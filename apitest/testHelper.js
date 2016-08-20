module.exports = {
  prepareForTest: function(ZSchema, validator) {
    ZSchema.registerFormat("int32", function (str) {
      return !isNaN(str);
    });
    ZSchema.registerFormat("double", function (str) {
      return !isNaN(str);
    });
    validator.setRemoteReference('REFERENCE', require('../peachdashboardapi/assets/swagger/swaggerspec.json'));
  },
  constants: {
    USER_ADMIN: 1,
    USER_MANAGER: 2,
    USER_MEMBER: 3,
    USER_SWITCHER: 4,

    ROLE_ADMIN: 1,
    ROLE_MANAGER: 2,
    ROLE_MEMBER:3
  }
}