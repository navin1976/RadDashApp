var plywood = require('plywood');

var External = plywood.External;
var druidRequesterFactory = require('plywood-druid-requester').druidRequesterFactory;
var druidRequester = druidRequesterFactory({
  host: 'localhost:8082' // Where ever your Druid may be
});

var chronoshift = require('chronoshift');

var WalltimeData = require('./WalltimeData.js');
chronoshift.WallTime.init(WalltimeData.rules, WalltimeData.zones);

module.exports = {
  createDataset: function(dataset) {
    return External.fromJS({
      engine: 'druid',
      source: dataset,  // The datasource name in Druid
      timeAttribute: 'time',  // Druid's anonymous time attribute will be called 'time',
      context: {
        timeout: 10000 // The Druid context
      }
    }, druidRequester);
  }
}
