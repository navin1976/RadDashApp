/**
 * Created by BlackLinden on 18/07/2016.
 */
module.exports = {
  create: function (req, res) {
    var configuration = req.body.configuration;
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

  find: function (req, res) {
    // todo refined to only show user dashboards + default for role
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
    var dashboardId = req.params.id;
    var userId = req.info.userId;
    UserDashboard.findOne({user:userId, dashboard:dashboardId}).exec(function(error, userDashboard) {
      if (userDashboard) {
        Dashboard.update({id: dashboardId}, {configuration: configuration, title: title, isEnabled: isEnabled}).exec(function(error, records) {
          if (error) {
            return res.negotiate(error);
          }
          res.status(205);
          return res.send();
        });
      } else {
        if (error) {
          res.negotiate(error);
          return res.send();
        }
        res.status(403);
        return res.send();
      }
    });
  },

  delete: function (req, res) {
    var id = req.params.id;
    // todo check if dashboard belongs to current user
    Dashboard.destroy({id: id}).exec(function (error) {
      if (error) {
          return res.negotiate(error);
      }
      res.status(205);
      return res.send();
    });
  },

  createDefault: function (req, res) {
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
  },

  updateDefault: function (req, res) {
    var configuration = req.body.configuration;
    var title = req.body.title;
    var isEnabled = req.body.isEnabled;
    var id = parseInt(req.params.id);
    RoleDashboard.findOne({dashboard:id}).exec(function(error, roledashboard) {
      if (roledashboard) {
        Dashboard.update({id: id}, {
          configuration: configuration,
          title: title,
          isEnabled: isEnabled
        }).exec(function (error) {
          if (error) {
            return res.negotiate(error);
          }
          res.status(205);
          return res.send();
        });
      } else {
        if (error) {
          res.negotiate(error);
          return res.send();
        }
        res.status(403);
        return res.send();
      }
    });
  },
}


