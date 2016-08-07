/**
 * Created by BlackLinden on 18/07/2016.
 */
module.exports = {
  create: function (req, res) {
    var title = req.body.title;
    var isEnabled = req.body.isEnabled;
    Dashboard.create({configuration: configuration, title: title, isEnabled: isEnabled}).exec(function(error, records){
      if (error) {
        // handle error here- e.g. `res.serverError(err);`
        return res.negotiate(error);
      }
      res.status(201);
      res.type('application/json');
      return res.send(JSON.stringify(records));
    });
  },

/**
 *
 * User.create({name:'Finn'}).exec(function (err, finn){
  if (err) { return res.serverError(err); }

  sails.log('Finn\'s id is:', finn.id);
  return res.ok();
});
 */
  find: function (req, res) {
    Dashboard.find({}).exec(function(error, records) {
      res.status(200);
      res.type('application/json');
      return res.send(JSON.stringify(records, null, 2));
    });
  },

  update: function (req, res) {
    var configuration = req.body.configuration;
    var title = req.body.title;
    var isEnabled = req.body.isEnabled;
    var id = req.params.id;
    Dashboard.update({id: id}, {configuration: configuration, title: title, isEnabled: isEnabled}).exec(function(error, records) {
      if (error) {
        return res.negotiate(error);
      }
      res.status(205);
      return res.send();
    });
  },

  delete: function (req, res) {
    var id = req.params.id;
    Dashboard.destroy({id: id}).exec(function (error) {
      if (error) {
          return res.negotiate(error);
      }
      res.status(205);
      return res.send();
    });
  },

  default: function (req, res) {
    var id = req.query.roleId;
    var configuration = req.body.configuration;
    var title = req.body.title;
    var isEnabled = req.body.isEnabled;
    Dashboard.create({configuration: configuration, title: title, isEnabled: isEnabled, roles:[id]}).exec(function(error, records){
      if (error) {
        return res.negotiate(error);
      }
      res.status(201);
      res.type('application/json');
      res.send(JSON.stringify(records));
    });
  }
}


