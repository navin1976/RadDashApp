/**
 * Created by BlackLinden on 14/08/2016.
 */
var Mocha = require('mocha');
var path = require('path');

var mocha = new Mocha();

files = process.argv.slice(2);
for (var i = 0; i < files.length; i++) {
  mocha.addFile(path.join(__dirname,files[i]));
}

// set the timeout to 15000
mocha.timeout(15000);

mocha.run(function(failures) {
  process.on('exit', function() {
    process.exit(failures);
  });
});