/**
 * Created by BlackLinden on 20/07/2016.
 */
module.exports = {
  find: function (req, res) {
    Datasource.find({}).populate('granularities').exec(function (error, records) {
      res.status(200);
      res.type('application/json');
      return res.send(JSON.stringify(records, null, 2));
    });
  }
}
