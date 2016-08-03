/**
 * Created by BlackLinden on 20/07/2016.
 */
module.exports = {
  find: function (req, res) {
    var dataEntities = [
      {
        "examId": 1,
        "examType": "CT",
        "timestamp": "2016-01-01 00:00"
      },
      {
        "examId": 2,
        "examType": "CT",
        "timestamp": "2016-01-01 00:00"
      },
      {
        "examId": 3,
        "examType": "CT",
        "timestamp": "2016-01-01 00:00"
      },
      {
        "examId": 4,
        "examType": "CT",
        "timestamp": "2016-01-01 00:00"
      }
    ];
    res.type('application/json',null, 2);
    res.status(200);
    return res.send(JSON.stringify(dataEntities));
  }
}
