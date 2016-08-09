/**
 * Created by BlackLinden on 20/07/2016.
 */
module.exports = {
  find: function (req, res) {
    User.find({}).exec(function (error, users) {
      if (error) {
        res.negotiate(error);
        res.send();
      }
      res.status(200);
      res.type('application/json');
      return res.send(JSON.stringify(users, null, 2));
    });
  },

  info: function (req, res) {
    var userId = req.info.userId;
    User.findOne({id: userId}).exec(function (error, user) {
      if (error) {
        res.negotiate(error);
        res.send();
      }
      Role.findOne({id: user.roleId}).exec(function (error, role) {
        if (error) {
          res.negotiate(error);
          res.send();
        }
        res.status(200);
        res.type('application/json');
        //role?
        return res.send(JSON.stringify(users, null, 2));
      });
    });
  }
}


