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
    // for now since the single sign-on has not been implemented
    // instead of having some logic with the token
    // we take the authorization header as containing the userId
    // of the user doing the request
    var userId = parseInt(req.headers.authorization);
    User.findOne(userId)
      .then(function(user) {
        if (user) {
          req.info = {};
          req.info.roleId = user.role;
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
    // for now, to simplify for the front end, even without
    // authorization header, the request is accepted as if coming from
    // userId 1
    req.info = {userId: 1, roleId:1};
    next();
    //return res.forbidden('You need an authorization header.');
  }
};
