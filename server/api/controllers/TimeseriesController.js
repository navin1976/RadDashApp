/**
 * Created by BlackLinden on 25/07/2016.
 */
module.exports = {
  create: function (req, res) {
    var dataTimeseries = {
      "dataSourceId": 1,
      "filters": [
        {
          "filterName": "dateRange",
          "filterValue": "1003=.."
        },
        {
          "filterName": "examStatus",
          "filterValue": "completed"
        }
      ],
      "metricId": "3",
      "granularityId": "5"
    };
    res.type('application/json', null, 2);
    res.status(200);
    return res.send(JSON.stringify(dataTimeseries));
  }
}
