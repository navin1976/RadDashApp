/**
 * Created by BlackLinden on 25/07/2016.
 */
module.exports = {
  create: function (req, res) {
    var dataTimeseries = [
      100,
      200,
      130.50,
      120,
      100
    ];
    res.type('application/json', null, 2);
    res.status(200);
    return res.send(JSON.stringify(dataTimeseries));
  }
}
