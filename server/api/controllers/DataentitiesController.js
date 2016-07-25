/**
 * Created by BlackLinden on 20/07/2016.
 */
module.exports = {
  find: function (req, res) {
    var dataEntity = {
      "dataSourceId": 1,
      "filters": [
        {
          "filterId": 3,
          "filterValue": "1000"
        },
        {
          "filterId": 6,
          "filterValue": [1, 3, 4]
        }
    ]
    }
    res.type('application/json',null, 2);
    res.status(200);
    return res.send(JSON.stringify(dataEntity));
  }
}
