/**
 * Created by BlackLinden on 20/07/2016.
 */
module.exports = {
  find: function (req, res) {
    User.find({}).exec(function (error, records) {
      res.status(200);
      res.type('application/json');
      return res.send(JSON.stringify(records, null, 2));
    });
  },

  findOne: function (res, req) {
    console.log(req.params);
    id = req.params.userId;
    User.findOne({id: userId}).exec(function(error, records) {
      if (error) {
        // handle error here- e.g. `res.serverError(err);`
        res.status(404);
        return res.send();
      }
      if (!id) {
        return res.notFound('Could not find Finn, sorry.');
      }
      res.status(205);
      res.type('application/json');
      return res.send(JSON.stringify(records, null, 2));
    });
  }
}


