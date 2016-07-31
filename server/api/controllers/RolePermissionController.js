/**
 * Created by BlackLinden on 20/07/2016.
 */
/**
 * Created by BlackLinden on 20/07/2016.
 */
module.exports = {
  assignRole: function (req, res) {
    console.log(req.query);
    idUpdate = req.query.userId;
    roleId = req.query.roleId;
    User.update({id: idUpdate}, {roleId: roleId}).exec(function(error, records){
      if (error) {
        // handle error here- e.g. `res.serverError(err);`
        res.status(404);
        return res.send();
      }
      res.status(205);
      res.type('application/json');
      return res.send();
    });
  },

  findRole: function (req, res) {
    Role.find({}).populate('permissions').exec(function(error, records) {
      res.status(200);
      res.type('application/json');
      return res.send(JSON.stringify(records, null, 2));
    });
  },

  findPermission: function (req, res) {
    Permission.find({}).exec(function(error, records) {
      res.status(200);
      res.type('application/json');
      return res.send(JSON.stringify(records, null, 2));
    });
  },

  assignPermission: function (req, res) {
    console.log(req.body);
    idUpdate = req.body.roleId;
    permissionIds = req.body.permissionIds;
    console.log(idUpdate, permissionIds);
    Role.update({id: idUpdate}, {permissions: permissionIds}).exec(function(error, records){
      if (error) {
        // handle error here- e.g. `res.serverError(err);`
        res.status(404);
        return res.send();
      }
      res.status(205);
      res.type('application/json');
      return res.send();
    });
  }
}
