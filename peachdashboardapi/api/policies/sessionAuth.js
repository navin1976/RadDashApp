/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

  if (req.headers.authorization) {
    // do the logic to convert the token to a userId
    var userId = parseInt(req.headers.authorization);
    User.findOne(userId)
      .then(function(user) {
        if (user) {
          req.info = {};
          req.info.roleId = user.roleId;
          console.log(user);
          req.info.userId = userId;
          return next();
        } else {
          res.forbidden('Authentication Failed');
        }
      })
      .catch(function(error){
        res.negotiate(error)
        return res.send();
      });
  } else {
    req.info = {userId: 1, roleId:1};
    next();
    //return res.forbidden('You need an authorization header.');
  }
  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  //
};
