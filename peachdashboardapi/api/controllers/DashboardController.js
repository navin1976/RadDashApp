/**
 * Created by BlackLinden on 18/07/2016.
 */
module.exports = {
  create: function (req, res) {
    console.log(req.body);
    configuration = req.body.configuration;
    title = req.body.title;
    isEnabled = req.body.isEnabled;
    console.log(configuration, title, isEnabled);
    Dashboard.create({configuration: configuration, title: title, isEnabled: isEnabled}).exec(function(error, records){
      if (error) {
        // handle error here- e.g. `res.serverError(err);`
        return res.negotiate(error);
      }
      res.status(205);
      res.type('application/json');
      return res.send();
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
    console.log(req.params, req.body);
    configuration = req.body.configuration;
    title = req.body.title;
    isEnabled = req.body.isEnabled;
    id = req.params.id;
    console.log(configuration, id, title, isEnabled);
    Dashboard.update({id: id}, {configuration: configuration, title: title, isEnabled: isEnabled}).exec(function(error, records) {
      if (error) {
        // handle error here- e.g. `res.serverError(err);`
        return res.negotiate(error);
      }
      res.status(205);
      res.type('application/json');
      return res.send();
    });
  },

  delete: function (req, res) {
    console.log(req.params);
    id = req.params.id;
    console.log(id);
    Dashboard.destroy({id: id}).exec(function (error) {
      if (error) {
          return res.negotiate(error);
      }
      res.status(205);
      return res.send();
    });
  },
  default: function (req, res) {
    console.log(req.body);
    console.log(req.query);
    id = req.query.roleId;
    configuration = req.body.configuration;
    title = req.body.title;
    isEnabled = req.body.isEnabled;
    console.log(id, configuration, title, isEnabled);
    Dashboard.create({configuration: configuration, title: title, isEnabled: isEnabled, roles:[id]}).exec(function(error, records){
      if (error) {
        return res.negotiate(error);
      }
      res.status(205);
      res.type('application/json');
      return res.send();
    });
  }
}


