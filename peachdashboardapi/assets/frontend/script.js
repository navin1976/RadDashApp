var myApp = angular.module('myApp', []);

myApp.controller('DoubleController', ['$scope', '$http', function ($scope, $http) {
  $scope.queryData = {};
  $scope.queryData.startTime = "3 months ago";
  $scope.queryData.endTime = "now";
  $scope.datasources = [];
  $http({
    method: 'GET',
    url: '/data/datasource'
  }).then(function successCallback(response) {
    $scope.queryData.datasource = response.data[0];
    $scope.queryData.metric = $scope.queryData.datasource.metrics[0].id;
    $scope.queryData.granularity = $scope.queryData.datasource.granularities[0].id;
    $scope.queryData.metricFilterId = $scope.queryData.datasource.filters[0].id;
    $scope.queryData.splitBy = null;
    $scope.datasources = response.data;
  }, function errorCallback(response) {
    console.log("There was an error with loading the data sources");
  });

  $scope.updateData = function () {
    $scope.displayChartData();
    $scope.displayTabularData();
  }

  $scope.displayChartData = function () {
    console.log($scope.queryData.granularity, $scope.queryData.metric, $scope.queryData.splitBy);

    $http({
      method: 'POST',
      url: '/data/timeseries',
      data: {
        "dataSourceId": $scope.queryData.datasource.id,
        "endTime": $scope.queryData.endTime,
        "filters": [],
        "granularityId": $scope.queryData.granularity,
        "metricId": $scope.queryData.metric,
        "metricFilterId": $scope.queryData.metricFilterId,
        "startTime": $scope.queryData.startTime,
        "splitBy": $scope.queryData.splitBy
      }
    }).then(function successCallback(response) {
      $scope.graphData = response.data.map(function (e) {
        e.date = e.date.substring(0, 10);
        return e;
      });

      var name = "";
      // get the name of the metric
      for (var i=0; i < $scope.queryData.datasource.metrics.length; i++) {
        if ($scope.queryData.datasource.metrics[i].id == $scope.queryData.metric) {
          name = $scope.queryData.datasource.metrics[i].name;
        }
      }
      var dataColumns = [
        ['x'].concat($scope.graphData.map(function (e) { return e.date; })),
        [name].concat($scope.graphData.map(function (e) { return e.metric; }))
      ];

      console.log(response.data);
      window.setTimeout(function () {
        var chart = c3.generate({
          bindto: '#chart',
          data: {
            x: 'x',
            columns: dataColumns
          },
          axis: {
            x: {
              type: 'timeseries',
              tick: {
                format: '%Y-%m-%d'
              }
            }
          }
        }
        );
      }, 300);
    }, function errorCallback(response) {
      console.log("There was an error with timeseries");
    });
  }
  $scope.displayTabularData = function () {
    $http({
      method: 'POST',
      url: '/data/entities',
      data: {
        "dataSourceId": $scope.queryData.datasource.id,
        "endTime": $scope.queryData.endTime,
        "filters": [],
        "startTime": $scope.queryData.startTime
      }
    }).then(function successCallback(response) {
      $scope.tabularData = response.data;
    }, function errorCallback(response) {
      console.log("There was an error with entities");
    });
  }

}]);