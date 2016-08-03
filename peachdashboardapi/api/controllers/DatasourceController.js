/**
 * Created by BlackLinden on 20/07/2016.
 */
module.exports = {
  find: function (req, res) {
    var datasource = [
      {
        "dataSourceName": "exams",
        "dataSourceId": 1,
        "filters": [
          {
            "filterId": 1,
            "filterName": "Date Range",
            "filterValueType": "dateRange",
          },
          {
            "filterId": 5,
            "filterName": "Cancellation Type",
            "filterValueType": "ENUM",
            "filterValueEnum": ["NDA", "Cancellation"]
          }
        ],
        "availableMetrics": [
          {
            "metricId": 5,
            "metricName": "Total Number"
          },
          {
            "metricId": 8,
            "metricName": "Median Time"
          }
        ],
        "availableGranularity": [
          {
            "granularityId": 5,
            "granularityName": "Daily"
          },
          {
            " granularityId": 1,
            " granularityName": "All time"
          }
        ]
      }
    ];
    res.status(200);
    res.type('application/json');
    return res.send(JSON.stringify(datasource, null, 2));
  }
}
