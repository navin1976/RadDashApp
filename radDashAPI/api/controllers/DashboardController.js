/**
 * Created by BlackLinden on 18/07/2016.
 */
module.exports = {
  create: function (req, res) {
    return res.send("Created");
  },
  find: function (req, res) {
    return res.send("Found");
  },
  update: function (req, res) {
    return res.send("Updated");
  },
  delete: function (req, res) {
    return res.send("Deleted");
  }
}
