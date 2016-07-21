/**
 * Created by BlackLinden on 18/07/2016.
 */
module.exports = {
  create: function (req, res) {
    var dashboardCreated = {
      "configuration": '{"backgroundColor": "a", "x": 0, "y": 0, "width": 3, "height": 8}',
      "id": 1,
      "is_enabled": true,
      "title": "Performance Metrics Oncology",
      "widgets": [
        {
          "configuration": '{"dataSource": "a", "x": 0, "y": 0, "width": 3, "height": 8}',
          "id": 11,
          "is_enabled": true,
          "title": "Appointments per hour"
        },
        {
          "configuration": '{"dataSource": "a", "x": 0, "y": 0, "width": 3, "height": 8}',
          "id": 11,
          "is_enabled": true,
          "title": "Visits per day"
        }
      ]
    };
    res.type('application/json',null, 2);
    res.status(201);
    return res.send(JSON.stringify(dashboardCreated));
  },
  find: function (req, res) {
    var dashboards = [
      {
        "configuration": '{"backgroundColor": "a", "x": 0, "y": 0, "width": 3, "height": 8}',
        "id": 1,
        "is_enabled": true,
        "title": "Performance Metrics Urology",
        "widgets": [
          {
            "configuration": '{"dataSource": "a", "x": 0, "y": 0, "width": 3, "height": 8}',
            "id": 11,
            "is_enabled": true,
            "title": "Appointments per hour"
          },
          {
            "configuration": '{"dataSource": "a", "x": 0, "y": 0, "width": 3, "height": 8}',
            "id": 11,
            "is_enabled": true,
            "title": "Scans per day"
          }
        ]
      },
      {
        "configuration": '{"backgroundColor": "a", "x": 0, "y": 0, "width": 3, "height": 8}',
        "id": 1,
        "is_enabled": true,
        "title": "Performance Metrics Oncology",
        "widgets": [
          {
            "configuration": '{"dataSource": "a", "x": 0, "y": 0, "width": 3, "height": 8}',
            "id": 11,
            "is_enabled": true,
            "title": "Appointments per hour"
          },
          {
            "configuration": '{"dataSource": "a", "x": 0, "y": 0, "width": 3, "height": 8}',
            "id": 11,
            "is_enabled": true,
            "title": "Visits per day"
          }
        ]
      }
    ];
    res.status(200);
    res.type('application/json');
    return res.send(JSON.stringify(dashboards, null, 2));
  },
  update: function (req, res) {
    res.status(205);
    return res.send();
  },
  delete: function (req, res) {
    res.status(205);
    return res.send();
  },
  default: function (req, res) {
    res.status(205);
    return res.send();
  }
}
