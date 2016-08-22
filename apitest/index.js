var stt = require('swagger-test-templates');
var swagger = require('../peachdashboardapi/assets/swagger/swaggerspec.json');
swagger.host = "localhost:1337";
var config = {
  assertionFormat: 'should',
  testModule: 'request',
  pathName: ['/REPLACE_ME_WITH_REAL_PATH'],
  //loadTest: [{pathName:'/user', operation:'get', load:{requests: 1000, concurrent: 100}}, { /* ... */ }],
  maxLen: 80,
  //pathParams: {
  //  "id": "0123"
  //}
};

// Generates an array of JavaScript test files following specified configuration
console.log(stt.testGen(swagger, config));

var fs = require('fs');
testToFilesList = stt.testGen(swagger, config);
for (var i = 0; i < testToFilesList.length; i++) {
  fs.writeFile('tests/'+ testToFilesList[i].name, testToFilesList[i].test, function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("file was saved!");
  });
}
