/**
 * Created by BlackLinden on 18/07/2016.
 */
module.exports = {


  find: function (req, res) {
    //only shows user dashboards + default for role
    var userId = req.info.userId;
    var roleId = req.info.roleId;
    var userDashboardIds = [];

    // find the dashboards for the role
    RoleDashboard.find({role: roleId}).exec(function(error, dashboardIds) {

      if (error){
        res.negotiate(error);
        return res.send();
      }

      for (var i = 0; i < dashboardIds.length; i++) {
        userDashboardIds.push(dashboardIds[i].dashboard);
      }

      // find the dashboard for the user
      UserDashboard.find({user: userId}).exec(function(error, dashboardIds){

        if (error){
          res.negotiate(error);
          return res.send();
        }

        for (var i = 0; i < dashboardIds.length; i++) {
          userDashboardIds.push(dashboardIds[i].dashboard)
        }

        // fetch the dashboards
        Dashboard.find({id:userDashboardIds}).exec(function(error, records) {

          if (error){
            res.negotiate(error);
            return res.send();
          }

          res.status(200);
          res.type('application/json');
          return res.send(JSON.stringify(records, null, 2));
        });
      });
    });
  },

  create: function (req, res) {
    var configuration = req.body.configuration;
    var title = req.body.title;
    var isEnabled = req.body.isEnabled;
    console.log("Is isEnabled a boolean?", typeof isEnabled === 'boolean');

    if (!(_.isString(configuration) || !(_.isString(title)) || !_.isBoolean(isEnabled))) {
      res.status(400);
      return res.send();
    }
    Dashboard.create({configuration: configuration, title: title, isEnabled: isEnabled, users:[req.info.userId]}).exec(function(error, records){
      if (error) {
        // handle error here- e.g. `res.serverError(err);`
        return res.negotiate(error);
      }
      res.status(201);
      res.type('application/json');
      return res.send(JSON.stringify(records));
    });
  },


  update: function (req, res) {
    var configuration = req.body.configuration;
    var title = req.body.title;
    var isEnabled = req.body.isEnabled;
    var dashboardId = parseInt(req.params.id);
    var userId = req.info.userId;

    if (isNaN(dashboardId) || !(_.isString(configuration) || !(_.isString(title)) || !_.isBoolean(isEnabled))) {
      res.status(400);
      return res.send();
    }
    //checks if dashboard belongs to current user
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
    var dashboardId = parseInt(req.params.id);
    console.log('dashboardId: ', dashboardId);
    //checks if dashboard belongs to current user
    var userId = req.info.userId;
    if (isNaN(dashboardId)) {
      res.status(400);
      return res.send();
    }
    UserDashboard.findOne({user: userId, dashboard: dashboardId}).exec(function(error, userDashboard) {
      if (userDashboard) {
        Dashboard.destroy({id: dashboardId}).exec(function (error) {
          if (error) {
            res.negotiate(error);
            return res.send();
          }
          res.status(205);
          return res.send();
        });
      } else if (error) {
        res.negotiate(error);
        return res.send();
      } else {
        res.status(403);
        return res.send();
      }
    });
  },

  findDefault: function (req, res) {
    var roleId = parseInt(req.query.roleId);
    console.log("roleId", roleId);
    var roleDashboardIds = [];

    /*
    if (isNaN(id)) {
      res.status(400);
      return res.send();
    }
    // find the dashboards for the role
    RoleDashboard.find({role: roleId}).exec(function(error, dashboardIds) {

      if (error){
        res.negotiate(error);
        return res.send();
      }

      for (var i = 0; i < dashboardIds.length; i++) {
        roleDashboardIds.push(dashboardIds[i].dashboard);
        console.log(dashboardIds[i].dashboard);
      }

        // fetch the dashboards
        Dashboard.find({id:roleDashboardIds}).exec(function(error, records) {

          if (error){
            res.negotiate(error);
            return res.send();
          }

          res.status(200);
          res.type('application/json');
          return res.send(JSON.stringify(records, null, 2));
        });
    });
    */
  },

  deleteDefault: function (req, res) {
    var dashboardId = parseInt(req.params.id);
    if (isNaN(dashboardId)) {
      res.status(400);
      return res.send();
    }
    //checks if dashboard belongs to current user
    RoleDashboard.findOne({dashboard: dashboardId}).exec(function(error, userDashboard) {
      if (userDashboard) {
        Dashboard.destroy({id: dashboardId}).exec(function (error) {
          if (error) {
            res.negotiate(error);
            return res.send();
          }
          res.status(205);
          return res.send();
        });
      } else if (error) {
        res.negotiate(error);
        return res.send();
      } else {
        res.status(403);
        return res.send();
      }
    });
  },

  createDefault: function (req, res) {
    var id = parseInt(req.query.roleId);
    var configuration = req.body.configuration;
    var title = req.body.title;
    var isEnabled = req.body.isEnabled;

    if (isNaN(id) || !(_.isString(configuration) || !(_.isString(title)) || !_.isBoolean(isEnabled))) {
      res.status(400);
      return res.send();
    }
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

    if (isNaN(id) || !(_.isString(configuration) || !(_.isString(title)) || !_.isBoolean(isEnabled))) {
      res.status(400);
      return res.send();
    }
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
        return res.send("This dashboard does not exist");
      }
    });
  },
}


