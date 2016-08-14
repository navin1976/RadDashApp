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
    USER_ADMIN: 5,
    USER_RADIOLOGIST: 6,
    USER_RADIOGRAPHER: 9
  }
}